function timeAgo(timestamp) {
  const now = Date.now();
  const diffInSeconds = Math.round((now - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000, // Approximation (average month length)
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1 // Now we properly handle seconds
  };

  for (const unit in intervals) {
    const interval = intervals[unit];
    if (diffInSeconds >= interval) {
      const value = Math.floor(diffInSeconds / interval);
      return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
    }
  }

  return "just now"; // Only if the timestamp is exactly the same as now
}


// Test function
function testTimeAgo() {
  const now = Date.now();

  assert(timeAgo(now - 5000), "5 seconds ago");
  assert(timeAgo(now - 70000), "1 minute ago");
  assert(timeAgo(now - 120000), "2 minutes ago");
  assert(timeAgo(now - 3600000), "1 hour ago");
  assert(timeAgo(now - 7200000), "2 hours ago");
  assert(timeAgo(now - 86400000), "1 day ago");
  assert(timeAgo(now - 172800000), "2 days ago");
  assert(timeAgo(now - 604800000), "1 week ago");
  assert(timeAgo(now - 1209600000), "2 weeks ago");
  assert(timeAgo(now - 2592000000), "1 month ago");
  assert(timeAgo(now - 5184000000), "2 months ago");
  assert(timeAgo(now - 31536000000), "1 year ago");
  assert(timeAgo(now - 63072000000), "2 years ago");
  assert(timeAgo(now - 5 * 1000), "5 seconds ago");
  assert(timeAgo(now - 59 * 1000), "59 seconds ago");
}

testTimeAgo();
