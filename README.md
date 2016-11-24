# UpDownRocket

updown.io integration for Rocket.Chat

## Installation <a name="installation"></a>

### Download code
Download source from [here](https://github.com/rmachado/UpDownRocket/archive/master.zip).<br />
Unzip Sources.
<br /><br /><br />

### Configure Rocket.Chat

#### Add user (optional)
This step is optional if you've already got a user which you want to use as post author you can skip this step.<br />
Otherwise add a new user who is posting the updates to your channel or who ist texting the user which is supposed to be informed.
<br /><br />

#### Configure incoming Webhook in Rocket.Chat
In your Rocket.Chat instance go to administration panel an click on "Integrations". To add an integration with BitRocket click on "NEW INTEGRATION".<br />
Next, choose "Incoming WebHook".
<br />
Now, on the webhook config screen, set the following values:
<br /><br />

##### Enabled
Set this value to true
<br /><br />

##### Name (optional)
Enter the desired name for the integration (e.g. "UpDownRocket").
<br /><br />

##### Post to Channel
Self-explaining option. Insert the desired channel or user which receives the post on pushing to your repositories.<br />
An example user would be `@username`, an example channel would be `#channelname`.
<br /><br />

##### Post as
Here you've got to define the user who is posting the updates. This is the user you've created earlier.
<br /><br />

##### Script Enabled
Set this setting to true.
<br /><br />

##### UpDown Script
Insert the complete code of the file `script.js` into this field.
<br /><br />

### Configure updown hook

Log into [updown.io](https://updown.io/checks), go to Settings. <br/>
Add a new webhook (in the bottom-right panel) and paste there the webhook url from Rocket.Chat

### Test the hook

After you set-up the integration you can test it by editing the file `example-payload.json` as you wish and using curl:

```bash
curl -X POST --data-urlencode 'payload=$EXAMPLE_CONTENT' $WEBHOOK_URL
```
