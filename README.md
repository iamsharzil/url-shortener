**_ To test, use POSTMAN _**

1.Create a short url

  - http://127.0.0.1:5000/api
  - Body => raw => application/json
  - Eg-

    ```
    {
    "longUrl" : "www.google.com"
    }
    ```

2.Get the long url

  - http/127.0.0.1:5000/api/:urlCode
    eg - http/127.0.0.1:5000/api/5tjPnDuDV

    On first GET request the redis will create two keys

         url code = longurl
          eg - 5tjPnDuDV = www.google.com

         count = 0
          eg - 5tjPnDuDV-count = 0

    After this, the cache middleware wil be called and the count will get increment on each request

3. To update the database with new count for each url
   run the command 
   ```
   - node updateCount.js --import
   ```
