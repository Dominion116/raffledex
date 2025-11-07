{ pkgs, ... }:
{
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # Or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22 # Use a newer version of Node.js
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  extensions = [
    "dbaeumer.vscode-eslint"
  ];

  # Enable previews and customize configuration
  previews = {
    enable = true;
    previews = [
      {
        # The name that shows up in the UI
        name = "web";
        # The command to run to start the preview
        command = "npm run dev -- --port $PORT --host 0.0.0.0";
        # The port that the preview will be available on
        port = 3000;
        # The type of preview, either "web" or "terminal"
        type = "web";
      }
    ];
  };

  # Defines the commands that should be run when the workspace starts
  # E.g. `npm install`
  idx.workspace.onStart = [
    "npm install"
  ];
}
