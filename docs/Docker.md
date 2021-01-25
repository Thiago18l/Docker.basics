# Creating a Dockerfile for the image

To package your app into an image, you first need to create a file called Dockerfile,
which will contain a list of instructions that Docker will perform when building the
image. The Dockerfile needs to be in the same directory as the app.js file and should
contain the commands shown in the following listing.

```Dockerfile
FROM node:7
ADD src/app.js /app.js
ENTRYPOINT ["node", "app.js"]
```

The **FROM** line defines the container image you’ll use as a starting point (the base
image you’re building on top of). In your case, you’re using the node container image,
tag 7 . In the second line, you’re adding your app.js file from your local directory into
the root directory in the image, under the same name (app.js). Finally, in the third
line, you’re defining what command should be executed when somebody runs the
image. In your case, the command is node app.js .


## Building the container Image

Now that you have your Dockerfile and the app.js file, you have everything you need
to build your image. To build it, run the following Docker command:

```bash
docker build -t kubia .
```

You’re telling Docker to
build an image called kubia based on the contents of the current directory (note the
dot at the end of the build command). Docker will look for the Dockerfile in the direc-
tory and build the image based on the instructions in the file.

When the build process completes, you have a new image stored locally. You can see it
by telling Docker to list all locally stored images, as shown in the following listing.

```bash
docker images
```
## Running the container Image

```bash
docker run --name kubia-container -p 8080:8080 -d kubia
```
This tells Docker to run a new container called kubia-container from the kubia
image. The container will be detached from the console ( -d flag), which means it will
run in the background. Port 8080 on the local machine will be mapped to port 8080
inside the container ( -p 8080:8080 option), so you can access the app through
http://localhost:8080.

Now try to access your application at http://localhost:8080 (be sure to replace localhost with the hostname or **IP** of the Docker host if necessary):

```bash
curl localhost:8080
```
That’s the response from your app. Your tiny application is now running inside a container, isolated from everything else.

The hexadecimal number is the ID of the Docker container.

## Listing running containers

```bash
docker ps
```
A single container is running. For each container, Docker prints out its ID and name,
the image used to run the container, and the command that’s executing inside the
container.


## Getting additional information about a container

The docker ps command only shows the most basic information about the containers.
To see additional information, you can use docker inspect:

```bash
docker inspect kubia-container
```

Docker will print out a long JSON containing low-level information about the container.

## Running a shell inside an existing container

```bash
docker exec -it kubia-container bash
```

This will run bash inside the existing kubia-container container. The bash process
will have the same Linux namespaces as the main container process. This allows you
to explore the container from within and see how Node.js and your app see the system
when running inside the container. The **-it** option is shorthand for two options:

- -i , which makes sure STDIN is kept open. You need this for entering com-
mands into the shell.
- -t, which allocates a pseudo terminal (TTY).

You need both if you want the use the shell like you’re used to. (If you leave out the
first one, you can’t type any commands, and if you leave out the second one, the command prompt won’t be displayed and some commands will complain about the TERM
variable not being set.)


## Exploring the container from within

Let’s see how to use the shell in the following listing to see the processes running in
the container.

```bash
ps aux
```

You see only three processes. You don’t see any other processes from the host OS. `press ctrl+d` to get out from the bash inside the container.

## Stopping and removing a container

To stop your app, you tell Docker to stop the kubia-container container:
```bash
docker stop kubia-container
```

This will stop the main process running in the container and consequently stop the
container, because no other processes are running inside the container. The container itself still exists and you can see it with `docker ps -a` . The **-a** option prints out
all the containers, those running and those that have been stopped. To truly remove a
container, you need to remove it with the docker rm command:

```bash
docker rm kubia-container
```

This deletes the container. All its contents are removed and it can’t be started again.
