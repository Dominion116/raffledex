{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # Or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20  # Specify Node.js version 20
  ];
  # Sets environment variables in the workspace
  env = {};
  # Fast way to run commands on workspace startup
  startup = {
    # This is an example of a command that will be run on startup
    # Command to run on startup
    npm-install = {
      command = "npm install";
    };
  };
}
