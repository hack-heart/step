// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.sps.data.Comment;
import java.io.IOException;
import java.lang.Math;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns comments from datastore */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    int numComments = results.countEntities(FetchOptions.Builder.withDefaults());

    List<Entity> limitedResults =
        results.asList(FetchOptions.Builder.withLimit(getMaxComments(request, numComments)));

    List<Comment> comments = new ArrayList<>();
    for (Entity entity : limitedResults) {
      comments.add(convertEntityToComment(entity));
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    String author = request.getParameter("author");
    String email = userService.getCurrentUser().getEmail();
    String text = request.getParameter("text");
    long timestamp = System.currentTimeMillis();

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("author", author);
    commentEntity.setProperty("email", email);
    commentEntity.setProperty("text", text);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("avatarUrl", getRandomImageUrl());

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Return to home page
    response.sendRedirect("/index.html");
  }

  /**
   * Returns the maximum number of comments to display as received from the client
   * Defaults to the total number of comments
   */
  private int getMaxComments(HttpServletRequest request, int numComments) {
    try {
      return Integer.parseInt(request.getParameter("maxComments"));
    } catch (Exception e) {
      return numComments;
    }
  }

  /** Makes timestamp human-readable */
  private static String formatTimestamp(long timestamp) {
    SimpleDateFormat timeFormatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
    return timeFormatter.format(timestamp);
  }

  /** Constructs a comment object from a Datastore entity */
  private static Comment convertEntityToComment(Entity entity) {
    long id = entity.getKey().getId();
    long timestamp = (long) entity.getProperty("timestamp");
    String author = (String) entity.getProperty("author");
    String avatarUrl = (String) entity.getProperty("avatarUrl");
    String text = (String) entity.getProperty("text");

    return new Comment(id, formatTimestamp(timestamp), author, avatarUrl, text);
  }

  /** Returns a random image URL for a comment's avatar */
  private static String getRandomImageUrl() {
    String[] allUrls = {"images/identicon-1.png", "images/identicon-2.png",
        "images/identicon-3.png", "images/identicon-4.png", "images/identicon-5.png",
        "images/identicon-6.png", "images/identicon-7.png", "images/identicon-8.png"};

    return allUrls[(int) (Math.random() * allUrls.length)];
  }
}
