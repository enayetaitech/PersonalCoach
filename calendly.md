Step 1- Create or login to your Calendly account.

Step 2- Click on the Integrations and App tab on the left side bar.

Step 3- Click on the API and webhooks card.

Step 4- Click on the Get a token now or similar options. 

Step 5 - Give a name to the token and click on the Generate token button.

Step 6- Copy the token and save it for future use.

Step 7- Open postman and create a new request. Method will be GET. Url will be https://api.calendly.com/users/me. In the headers tab, add a new header with the key as "Authorization" and value as "Bearer [your_token]". Click on the Send button to send the request.

Step 8- You will receive a response with your Calendly account information. My example response is as follows:

```javascript
{
    "resource": {
        "avatar_url": null,
        "created_at": "2024-09-16T07:58:42.507523Z",
        "current_organization": "https://api.calendly.com/organizations/956f317c-9f60-4b25-a644-3cc4d61511a3",
        "email": "mdrehman@365aitech.com",
        "name": "Md Rehman",
        "resource_type": "User",
        "scheduling_url": "https://calendly.com/mdrehman-365aitech",
        "slug": "mdrehman-365aitech",
        "timezone": "Asia/Dhaka",
        "updated_at": "2024-09-16T08:15:31.075174Z",
        "uri": "https://api.calendly.com/users/0279f282-402d-4f77-ac9b-ed0b3070194c"
    }
}
```


Step 9- Now create a new request. Method will be POST. url will be https://api.calendly.com/webhook_subscriptions

Step 10- Select Authorization tab and select Bearer Token in the dropdown menu. In the Token field, paste the API Access Token you generated from Calendly.

Step 11- Go to the Headers tab and add a new header with the key as "Content-Type" and value as "application/json".

Step 12- Go to the Body tab and select the raw option. Choose JSON as the format and paste the following JSON code:

```javascript
{
  "url": `This will be the value of uri you received in step 15`,
  "events": ["invitee.created", "invitee.canceled"],
   "organization":`This will be the value of current_organization you received in step 8`,
  "user":`This will be the value of uri you received in step 8`,
  "scope": "user"
}
```

Step 13- Go to make.com and login to your account.

Step 14- Click scenarios and click on the create a new scenario button. Select webhooks, then Custom webhook. 

Step 15- Click Add button and give webhook a name and save it. click Copy address to clipboard button. Paste it in step 12. Click send button. You will receive a response with the webhook URL. My one is look like as follows 

```javascript
{
    "resource": {
        "callback_url": "https://hook.eu2.make.com/1ggw1ysundpt7whmmrcg2t9ndcn9byf5",
        "created_at": "2024-09-16T08:21:53.271436Z",
        "creator": "https://api.calendly.com/users/0279f282-402d-4f77-ac9b-ed0b3070194c",
        "events": [
            "invitee.created",
            "invitee.canceled"
        ],
        "group": null,
        "organization": "https://api.calendly.com/organizations/956f317c-9f60-4b25-a644-3cc4d61511a3",
        "retry_started_at": null,
        "scope": "user",
        "state": "active",
        "updated_at": "2024-09-16T08:21:53.271436Z",
        "uri": "https://api.calendly.com/webhook_subscriptions/716de6e0-56bd-4625-8a0c-661a8198b0ad",
        "user": "https://api.calendly.com/users/0279f282-402d-4f77-ac9b-ed0b3070194c"
    }
}
```

Step 16- Go go make.com and Click Run once button then go to calendly.com and create a new event. Click view booking page select a date and time and click on the next button. Then type name and email and click Schedule button.

Step 17- You will receive a response with the webhook URL at make.com. 