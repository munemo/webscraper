const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express')
const app = express()

app.get('/', (res, req)=>{


    axios.get('https://www.starwars.com/news')
    .then((response) => {
        //parse response.data object into cheerio
        let $ = cheerio.load(response.data);
        let articles = [];
        $('.news-articles li').each((index, element) => {

            // save the articles in the articles array
            articles.push({
                url: $(element).find('a').attr('href'),
                aurthor: $(element).find('.byline-author').text().trim(),
                title: $(element).find('h2').text().trim()
            });
           
            //log the text under the h2 tag in the console
           // console.log($(element).find('h2').text().trim());
        });
     //create json file called "articles.js in the root folder"
     fs.writeFile('./articles.js', JSON.stringify(articles), (error) => {

        if (error) throw error;
    })
    })

   
    .catch((error) => {
        console.log(error);
    });

})



app.listen(3000, () => {

    console.log('Sever is running')
})
