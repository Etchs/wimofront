1. Download and install git (https://git-scm.com/downloads)

2. Clone our repository to your computer

3. Now you need to install Oracle Virtual box (https://www.virtualbox.org/wiki/Downloads) and Vagrant (https://www.vagrantup.com/downloads.html)

4. Open git bash as an administrator (if you're on windows) and navigate to the folder 'wimofront' which was cloned in step 2 (Note: git bash is installed by default in step 1)

5. Now you need to run the following command "Vagrant up", which will automatically download and create the virtual machine in the folder specified in (VirtualBox -> Preference -> Default Machine Folder) and it will install all the required libraries, packages and execute scripts to make it ready for development. If everything executed correct with no errors, you should expect last output to look like this "notice: Finished catalog run in xx.xx seconds" 

6. You should find a new virtual machine created in virtual box and running, you now need to access this machine from the terminal/bash by using this command "vagrant ssh" at the folder named 'wimofront'

7. Now that the virtual machine is running in your terminal/bash, run these commands:
   `sudo npm install -g grunt-cli`
   `sudo npm install -g bower`

8. navigate to /vagrant and run the following commands:
	`sudo npm install`
	`grunt bower-install-simple`
	`npm i -g lodash-cli`
	`lodash modern -o ./lodash.js`
	`sudo grunt build:angular`
	`sudo npm start`
	
	
	