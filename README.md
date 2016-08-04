# SmartThings Datastore Collector
NodeJS service and SmartThings SmartApp to collect events from SmartThings hub and store in Google Cloud Datastore for later data mining.

## Setup
1. Fork this repo and clone to local machine.

### Google Cloud
1. Create a project on Google Cloud Console. You'll need to enable billing on the project in order to use Datastore(???).
2. Create a [Google Cloud Service Account](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#createcutomserviceaccount). This is needed to have the NodeJS service be able to authenticate.
3. Download json of service account after creation of account. 
4. Rename file to credentials.json and place in root directory of project.

### Heroku
1. Create new Project on [Heroku](https://heroku.com)
2. I recommend doing the [deploy from Github](https://devcenter.heroku.com/articles/github-integration) repo and pointing to your fork of this repo.

### Configuration
You will need to set a few environment variables in Heroku. For details on setting [environment variables in Heroku](https://devcenter.heroku.com/articles/config-vars)

1. GOOGLE_PROJECT_ID = this is your google cloud project id. Ex: my-project-13456
2. API_KEY = this is a user defined api key so you can generate it yourself. this key helps protect bots from pushing data into your datastore.

### SmartThings
1. Go to the SmartThings [App IDE](https://graph.api.smartthings.com/ide/apps)
2. Click "New SmartApp", followed by clicking "From Code" button.
3. Paste in the SmartApp code location in the smartapp folder of this project.
4. Click "Save" and then "Publish" and then "For Me"
5. In the SmartThings mobile app, add new SmartApp and configure with your chosen devices.
6. Configure your collector URL into the SmartApp. Ex. https://<myAppName>.herokuapp.com/events
7. Add your API_KEY from the previous Configuration section to the collector key field.

