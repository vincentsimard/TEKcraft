# Calendar Puzzle

## Description

This kata is based on the calendar rendering problem found on at [https://github.com/gregstallings/calendar-puzzle](https://github.com/gregstallings/calendar-puzzle).

Usually, there's a front-end part to the problem but let's ditch that and expect the application to receive a series of events on he calendar for a single day and return an array of those events with the dimension and position of the box.

### Original description

Write a function (JavaScript) to lay out a series of events on the calendar for a single day.

Events will be placed in a container. The top of the container represents 9am and the bottom represents 9pm. The width of the container will be 620px (10px padding on the left and right) and the height will be 720px (1 pixel for every minute between 9am and 9pm). The objects should be laid out so that they do not visually overlap. If there is only one event at a given time slot, its width should be 600px.

There are 2 major constraints:

* Every colliding event must be the same width as every other event that it collides width. 
* An event should use the maximum width possible while still adhering to the first constraint.

The input to the function will be an array of event objects with the start and end times of the event. Example (JavaScript):

```javascript
[
  { id: 1, start: 60, end: 120 },  // Event from 10am to 11am
  { id: 2, start: 100, end: 240 }, // Event from 10:40am to 1pm
  { id: 3, start: 700, end: 720 }  // Event from 8:40pm to 9pm 
]
```

The function should return an array of event objects that have the box dimensions and position set (relative to the top left of the container), in addition to the id, start, and end time.

```javascript
/**
 * Lays out events for a single  day
 *
 * @param {Array} events An array of event objects. Each event object consists
 *                       of a start and end time  (measured in minutes) from 9am,
 *                       as well as a unique id. The start and end time of each
 *                       event will be [0, 720]. The start time will be less than
 *                       the end time.
 *
 * @return {Array} An array of event objects that has the width, height, the left and top
 *                 positions set, in addition to the id, start and end time. The 
 *                 object should be laid out so that there are no overlapping events.
 *
 * function layOutDay(events) {...}
 */
 ```