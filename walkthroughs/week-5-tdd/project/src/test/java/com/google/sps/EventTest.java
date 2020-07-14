// Copyright 2020 Google LLC
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
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/** */
@RunWith(JUnit4.class)
public final class EventTest {
  private static final int DURATION_30_MINUTES = 30;
  private static final int DURATION_60_MINUTES = 60;

  private static final int TIME_0830 = TimeRange.getTimeInMinutes(8, 30);
  private static final int TIME_1330 = TimeRange.getTimeInMinutes(13, 30);

  @Test
  public void orderEventsByStartTime() {
    // The late event should be added to the queue before the early event. This means the priority
    // queue should re-order them
    Event earlyEvent = new Event("Early Event",
        TimeRange.fromStartDuration(TIME_0830, DURATION_30_MINUTES), Arrays.asList());
    Event lateEvent = new Event(
        "Late Event", TimeRange.fromStartDuration(TIME_1330, DURATION_60_MINUTES), Arrays.asList());

    PriorityQueue<Event> eventQueue = new PriorityQueue<>(Event.ORDER_BY_START_TIME);
    eventQueue.add(lateEvent);
    eventQueue.add(earlyEvent);
    Event[] actual = eventQueue.toArray(new Event[eventQueue.size()]);

    Event[] expected = {earlyEvent, lateEvent};

    Assert.assertEquals(expected, actual);
  }
}
