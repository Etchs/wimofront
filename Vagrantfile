
# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

$script = <<SCRIPT
    yes | sudo apt-get update
	yes | sudo apt-get install make
    yes | sudo apt-get install g++
	yes | sudo apt-get purge nodejs npm
	yes | sudo apt-get install curl
	yes | curl -sL https://deb.nodesource.com/setup | sudo bash -
	yes | sudo apt-get install -y nodejs
	yes | sudo apt-get install git-core
	mkdir -p /var/tmp/wimo-front/node_modules
	chmod -R 777 /var/tmp/wimo-front/
	ln -sf /vagrant/package.json /var/tmp/wimo-front/
	ln -sf /var/tmp/wimo-front/node_modules /vagrant/
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "hashicorp/precise64"
  
  config.vm.network "forwarded_port", guest: 80, host: 8282
  config.vm.network "forwarded_port", guest: 8080, host: 8000
  config.vm.network "forwarded_port", guest: 5858, host: 5757
  config.vm.network :forwarded_port, guest: 35729, host: 35729
  
  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end
  
  config.vm.provision "shell", inline: $script
	# config.vm.provision :shell, :inline => install_dep('puppetlabs-apt', '1.6.0')
	# config.vm.provision :shell, :inline => install_dep('puppetlabs-nodejs', '0.6.1')
	# config.vm.provision :shell, :inline => install_dep('puppetlabs-nodejs', '0.8.0') # no need as long as machine puppet's version is not >= 3.0 and < 4.0
 
  # no need to use puppetlabs-nodejs'0.8.0' as long as machine puppet's version is not >= 3.0 and < 4.0
  # config.vm.provision "puppet" do |puppet|
  #   puppet.manifests_path = "manifests"
  #   puppet.manifest_file  = "default.pp"
  # end

end
