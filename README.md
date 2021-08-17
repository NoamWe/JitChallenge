# JitChallenge
# Prerequisites
1. clone
2. run `npm install`
3. run `docker run -p 6379:6379 -d redis`

# API
* GET localhost:5000/top/:n where n is a number

# Points I left out
1. I couldn't find an API that will give me the number of result I need. Instead I took the an as a maximum N which I want to return. Easy to improve with a bit more digging.
2. I was looking for a way to assess the risk without actually cloning the repo to the disk. Did not found one within the time limits. In real life I would try to do it differently.
