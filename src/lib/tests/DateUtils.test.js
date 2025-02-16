/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
jest.dontMock('../DateUtils');
const DateUtils = require('../DateUtils');

describe('isDate', () => {
  it('only returns true for Date objects', () => {
    expect(DateUtils.isDate(new Date())).toBe(true);
    expect(DateUtils.isDate(12)).toBe(false);
    expect(DateUtils.isDate({})).toBe(false);
  });
});

describe('shortMonth', () => {
  it('provides appropriate shortened versions', () => {
    expect(DateUtils.shortMonth(0)).toBe('Jan');
    expect(DateUtils.shortMonth(1)).toBe('Feb');
    expect(DateUtils.shortMonth(5)).toBe('June');
    expect(DateUtils.shortMonth(6)).toBe('July');
    expect(DateUtils.shortMonth(8)).toBe('Sept');
  });

  it('does not fail on invalid months', () => {
    expect(DateUtils.shortMonth(-1)).toBe('');
    expect(DateUtils.shortMonth(12)).toBe('');
  });
});

describe('nextMonth', () => {
  it('returns the first day of the next month', () => {
    const start = new Date(2001, 2, 3, 4, 5, 6);
    const next = DateUtils.nextMonth(start);
    expect(next.getFullYear()).toBe(2001);
    expect(next.getMonth()).toBe(3);
    expect(next.getDate()).toBe(1);
    expect(next.getHours()).toBe(0);
    expect(next.getMinutes()).toBe(0);
    expect(next.getSeconds()).toBe(0);
  });
});

describe('prevMonth', () => {
  it('returns the first day of the previous month', () => {
    const start = new Date(2001, 2, 3, 4, 5, 6);
    const next = DateUtils.prevMonth(start);
    expect(next.getFullYear()).toBe(2001);
    expect(next.getMonth()).toBe(1);
    expect(next.getDate()).toBe(1);
    expect(next.getHours()).toBe(0);
    expect(next.getMinutes()).toBe(0);
    expect(next.getSeconds()).toBe(0);
  });
});

describe('daysInMonth', () => {
  it('returns the days in each month', () => {
    expect(DateUtils.daysInMonth(new Date(2015, 0))).toBe(31);
    expect(DateUtils.daysInMonth(new Date(2015, 1))).toBe(28);
    expect(DateUtils.daysInMonth(new Date(2012, 1))).toBe(29);
    expect(DateUtils.daysInMonth(new Date(2015, 8))).toBe(30);
  });
});

describe('DateUtils', () => {
  describe('formatDateTime', () => {
    const testDate = new Date('2024-03-21T08:00:00.000Z');

    it('should format date in UTC time when useLocalTime is false', () => {
      const result = DateUtils.formatDateTime(testDate, false);
      expect(result).toBe('2024-03-21 08:00:00');
    });

    it('should format date in local time when useLocalTime is true', () => {
      // 假设本地时区是 UTC+8
      const result = DateUtils.formatDateTime(testDate, true);
      expect(result).toBe('2024-03-21 16:00:00');
    });

    it('should handle null date', () => {
      const result = DateUtils.formatDateTime(null, false);
      expect(result).toBe('');
    });

    it('should handle invalid date', () => {
      const result = DateUtils.formatDateTime('invalid date', false);
      expect(result).toBe('');
    });
  });

  describe('yearMonthDayTimeFormatter', () => {
    const testDate = new Date('2024-03-21T08:00:00.000Z');

    it('should format date in UTC format', () => {
      const result = DateUtils.yearMonthDayTimeFormatter(testDate, true);
      expect(result).toBe('2024-03-21 08:00:00');
    });

    it('should format date in local format', () => {
      const result = DateUtils.yearMonthDayTimeFormatter(testDate, false);
      // 假设本地时区是 UTC+8
      expect(result).toBe('2024-03-21 16:00:00');
    });
  });
});
