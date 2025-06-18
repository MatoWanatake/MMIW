To build for production:

step 1: Build the image
- right click the docker file and build it
- give it a name `<dockerhub username>/projectname:latest`
-   example: `anthonybronca/mato_cap:latest`


step 2: Go to docker app
- Click the 3 dots next to the image you just built, and press "push to docker hub"


step 3: Build on render
- Click on the "+" at the top right
- select "Web service"
- Select "Docker image"
- enter the docker image name you used in step 1, make sure to prefix with `docker.io`
- Make sure to connect and select "free"
- Add `DATABASE_URL`, and `SCHEMA` environment variables

step 4: profit



---- when rebuilding after a deploy is made----

step 1: Build the image
- right click the docker file and build it
- give it a name `<dockerhub username>/projectname:latest`
-   example: `anthonybronca/mato_cap:latest`


step 2: Go to docker app
- Click the 3 dots next to the image you just built, and press "push to docker hub"


step 3: Build on render
- click "build and redeploy"
