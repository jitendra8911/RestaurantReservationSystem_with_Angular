This is the Restaurant Reservation System project whose UI was already developed earlier and now is extended to angular js

Steps to build the project in your local environment.

1) In the Java EE Eclipse, create a project of type "Dynamic Web Project"
2) Assign installed Tomcat server to the created project
3) Then select the project, right click on it and select "Configure -> Convert to Maven Project"
4) Add the content in pom.xml included in this project to your newly created pom.xml file
5) Then right click on the project and select "Maven -> Update the project"
6) Then add the source code of this project present in "Jave Code" directory to your project under "Java Resources -->src"
7) Then add the Web content of this project to your project
8) Create mysql database schema which is available in  "tables and insert script" file present in "Scripts" foler
9) Create the stored procedures which are available in  "Stored Procs" folder in "Scripts" folder
10) Change the database configuration to your environment in the file DBUtil.java present java code-> src->jitendra->utils
11) Start tomcat server
12) Run index.html on the server
13) that's it !!!

Thank you !