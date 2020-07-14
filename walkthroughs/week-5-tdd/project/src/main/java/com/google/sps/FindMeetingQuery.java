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

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.PriorityQueue;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    PriorityQueue<Event> eventQueue = new PriorityQueue<>(Event.ORDER_BY_START_TIME);
    eventQueue.addAll(events);

    Collection<TimeRange> availableTimes = new ArrayList<TimeRange>();
    int currStartTime = TimeRange.START_OF_DAY;

    while (!eventQueue.isEmpty()) {
      Event currEvent = eventQueue.remove();
      int currEventStart = currEvent.getWhen().start();
      int currEventEnd = currEvent.getWhen().end();

      if (hasAttendees(currEvent, request.getAttendees())) {
        int timeBlock = currEventStart - currStartTime;
        if ((long) timeBlock - request.getDuration() >= 0) {
          availableTimes.add(TimeRange.fromStartEnd(currStartTime, currEventStart, false));
        }
        currStartTime = currStartTime > currEventEnd ? currStartTime : currEventEnd;
      }
    }

    // handle open spaces between the last event of the day and end of day
    int timeBlock = TimeRange.END_OF_DAY - currStartTime;
    if ((long) timeBlock - request.getDuration() > 0) {
      availableTimes.add(TimeRange.fromStartEnd(currStartTime, TimeRange.END_OF_DAY, true));
    }

    return availableTimes;
  }

  private static final boolean hasAttendees(Event event, Collection<String> attendees) {
    for (String attendee : attendees) {
      if (event.getAttendees().contains(attendee)) {
        return true;
      }
    }
    return false;
  }
}
