import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true

});



import React, { useEffect, useState }  from 'react'

const  GetResponse  =  (content) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

	useEffect( () => {
		const response =   openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "user",
                "content":content
              }
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
          });
          response
				.then(async(res) => {
          let contentResult='';
          let SET_DATA_CONTENT = {
            time: new Date().getTime(),
            blocks: [
              {
              type: "header",
              data: {
                text: content,
                level: 1,
              },
              },
            ],
            };
          for await (const chunk of res) {
            contentResult += chunk.choices[0]?.delta?.content || '\n';
          }
          console.log(contentResult);
          SET_DATA_CONTENT.data=contentResult;
					return SET_DATA_CONTENT;
				})
				.then((data) => {
					// console.log(data.items);
					setData(data);
					setIsLoading(false);
				})
				.catch((err) => {
					setError(err.message);
					setIsLoading(false);
				});
		}, [content])
	
    return{data,isLoading,error}


}





export default GetResponse





