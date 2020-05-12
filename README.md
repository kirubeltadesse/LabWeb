# LabWeb
This repository is a private repo which contains a django project for SparcLab website. Note: there are two version of the website one is the `django` version and the other one is the `django-cms` version of the site.
Below are the instruction how to work for both the on both the sites. 

## Django project
### Required packages
The packages required for the Django server and every application on this project are included in the `environment.yml` file. You can directly create a anaconda environment from the file using the command below.

```
$ conda create --name <env> -file environment.yml
```

those should create an environment with the necessary dependencies to run the application. Then, activate your conda env by

```
activate <env>
```

And cd to `LabWeb` and there should be a `manage.py` file

```
python manage.py makemigrations
```

and

```
python manage.py migrate
```

and finally just to make sure

``` 
python manage.py migrate --run-syncdb
```

After this you can directly launch your localhost by running:

``` 
python manage.py runserver
```

Similarly, you can also view the this site on [Heroku server](https://sparchbcsim.herokuapp.com/)

## Django-cms project
You can directly view the site on the [Heroku server](https://sparchbcsim.herokuapp.com/). Use the command below to download the project on our local machine:
``` 
heroku git:clone -a sparcweb
```
The downloaded project folder also contain a different `environment.yml` you can use the steps on the django project above command to create a different conda environment from this project.

Note: you can also use the edit the website using basic way of edition django website. Addition information are found [here](Documentation/Report%20SparcLab.pdf) 
