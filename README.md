# Quotes API
© 2024, Raihan Khairul Rochman  

A lightweight and free quotes API.  
This API is hosted at [this address](https://free-quotes.vercel.app).
Feel free to visit it.

# Credit
**All of the quotes data used in this API is downloaded from [this source](https://huggingface.co/datasets/Abirate/english_quotes).**

# API Docs
* `/api/authors`
  ---
  Show all of the author of the quotes.  

  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/authors
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          "Oscar Wilde",
          "Marilyn Monroe",
          "Albert Einstein",
          "Frank Zappa",
          ...
      ]
  }
  ```
  [Back to top](#api-docs)

* `/api/tags`
  ---
  Show all of the available tags from all quotes.

  **Example request**
  ```http
  https://free-quotes.vercel.app/api/tags
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          "be-yourself",
          "gilbert-perreira",
          "honesty",
          "inspirational",
          ...
      ]
  }
  ```
  [Back to top](#api-docs)

* `/api/tags/popularity`
  ---
  Show all the tags with the count of its appearance among the quotes datasets. Sorted from the most-appearance to the least-appearance.

  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/tags/popularity
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          [
              "love",
              327
          ],
          [
              "inspirational",
              319
          ],
          [
              "life",
              295
          ],
          ...
      ]
  }
  ```
  [Back to top](#api-docs)

* `/api/random`
  ---
  Get a random quotes

  **Queries:**
  * `maxlength` - Filter quotes by maximal length
  * `minlength` - Filter quotes by minimal length
  * `author` - Filter quotes from the specified author only
  * `tag` - Filter quotes that has the specified tag only
  
  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/?author=John%20Locke
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": {
          "quote": "“Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours.”",
          "author": "John Locke",
          "tags": [
              "knowledge",
              "reading",
              "thinking"
          ]
      }
  }
  ```
  [Back to top](#api-docs)

* `/api/qod/:tag?`
  ---
  Get quote of the day. Updated once every day

  **Params:**
  * `tag` [optional] - Get quote of the day from the specified tag. If `tag` is omitted, this will return quote of the day from all tags. Available tags:  
    * `love` - Quotes of the day about love
    * `inspirational` - Inspirational quote sof the day
    * `life` - Quotes of the day about life
    * `humor` - Humor quotes of the day
    * `books` - Quotes of the day about books
  
  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/qod
  ``` 
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": {
          "title": "Quotes of the day",
          "quote": "“It's enough for me to be sure that you and I exist at this moment.”",
          "author": "Gabriel `Garc­ía Márquez,",
          "tags": [
              "existence",
              "truth"
          ]
      }
  }
  ```
  [Back to top](#api-docs)

* `/api/search/:quote`
  ---
  Search quotes that contains the keywords in `quote` param.

  **Params:**
  * `quote` - The keywords that will be used to search the quotes.

  **Queries:**
  * `maxlength` - Filter quotes by maximal length
  * `minlength` - Filter quotes by minimal length
  * `author` - Filter quotes from the specified author only
  * `tag` - Filter quotes that has the specified tag only
  
  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/search/be%20nice
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          {
              "quote": "“Be nice to nerds. You may end up working for them. We all could.”",
              "author": "Charles J. Sykes,",
              "tags": [
                  "humor",
                  "misattributed-to-bill-gates",
                  "nerd",
                  "nerds",
                  "work"
              ]
          }
      ]
  }
  ```
  [Back to top](#api-docs)

* `/api/search/author/:author`
  ---
  Search quotes by author name

  **Params:**
  * `author` - The name of the author to be searched for

  **Queries:**
  * `maxlength` - Filter quotes by maximal length
  * `minlength` - Filter quotes by minimal length
  * `tag` - Filter quotes that has the specified tag only
  
  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/search/author/Rice
  ```
  **Example response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          {
              "quote": "“It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.”",
              "author": "Maurice Switzer,",
              "tags": [
                  "misattributed-to-abraham-lincoln",
                  "misattributed-to-mark-twain",
                  "remaining-silent",
                  "wisdom"
              ]
          },
          {
              "quote": "“You do have a story inside you; it lies articulate and waiting to be written â€” behind your silence and your suffering.”",
              "author": "Anne Rice",
              "tags": [
                  "anne-rice",
                  "pandora"
              ]
          }
      ]
  }
  ```
  [Back to top](#api-docs)

* `/api/search/tag/:tag`
  ---
  Search quotes by tags
  
  **Params:**
  * `tag` - The tag to be searched for
  
  **Queries:**
  * `maxlength` - Filter quotes by maximal length
  * `minlength` - Filter quotes by minimal length
  * `tag` - Filter quotes that has the specified tag only

  **Example request:**
  ```http
  https://free-quotes.vercel.app/api/search/tag/comfort-zone
  ```

  **Exmaple response:**
  ```json
  {
      "code": 200,
      "status": "OK",
      "data": [
          {
              "quote": "“It's only after you've stepped outside your comfort zone that you begin to change, grow, and transform.”",
              "author": "Roy T. Bennett",
              "tags": [
                  "step-out-of-comfort-zone",
                  "transform"
              ]
          },
          {
              "quote": "“You never change your life until you step out of your comfort zone; change begins at the end of your comfort zone.”",
              "author": "Roy T. Bennett",
              "tags": [
                  "step-out-of-your-comfort-zone"
              ]
          }
      ]
  }
  ```
  [Back to top](#api-docs)
