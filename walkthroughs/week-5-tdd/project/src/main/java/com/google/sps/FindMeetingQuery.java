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

import java.lang.Math;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.PriorityQueue;

/**
 * Returns a Collection of TimeRange objects that represents the available time slots for a meeting
 * to hold
 *
 * @param events     a collection of other events happening on the day of the meeting
 * @param request    a meeting request with a duration and a collection of attendees
 * @return           a collection of TimeRanges in which the meeting could hold
 */
public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    PriorityQueue<Event> eventQueue = new PriorityQueue<>(Event.ORDER_BY_START_TIME);
    eventQueue.addAll(events);

    Collection<TimeRange> availableTimes = new ArrayList<TimeRange>();
    int startOfAvailableTime = TimeRange.START_OF_DAY;

    while (!eventQueue.isEmpty()) {
      Event event = eventQueue.remove();

      if (!hasAttendees(event, request.getAttendees())) {
        continue;
      }

      int eventStart = event.getWhen().start();
      int eventEnd = event.getWhen().end();

      int availableTimeBlock = eventStart - startOfAvailableTime;
      if (availableTimeBlock >= request.getDuration()) {
        availableTimes.add(TimeRange.fromStartEnd(startOfAvailableTime, eventStart, false));
      }

      startOfAvailableTime = Math.max(startOfAvailableTime, eventEnd);
    }

    // handle open spaces between the last event of the day and end of day
    int finalTimeBlock = TimeRange.END_OF_DAY - startOfAvailableTime;
    if (finalTimeBlock >= request.getDuration()) {
      availableTimes.add(TimeRange.fromStartEnd(startOfAvailableTime, TimeRange.END_OF_DAY, true));
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
