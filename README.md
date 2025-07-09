# Copy Path

This is a plugin for [Obsidian](https://obsidian.md/) that adds context menu actions for copying the full, vault relative, or WSL paths of files and folders.

## Installation

The plugin is not available in [the official Community Plugins repository](https://obsidian.md/plugins) yet.

To install the latest release of this plugin, follow these steps:

1. Ensure you have the [BRAT plugin](https://obsidian.md/plugins?id=obsidian42-brat) installed and enabled.
2. Click [Install via BRAT](https://intradeus.github.io/http-protocol-redirector?r=obsidian://brat?plugin=https://github.com/Comatose5/obsidian-copy-wsl-path).
3. An Obsidian pop-up window should appear. In the window, click the `Add plugin` button once and wait a few seconds for the plugin to install.

## Settings

- **"Copy vault path" context menu action**: Show the option to copy the vault path of a file or folder.
- **"Copy full path" context menu action**: Show the option to copy the full path of a file or folder.
- **"Copy WSL path" context menu action**: Show the option to copy the WSL-compatible path of a file or folder (converts Windows paths like `C:\folder\file.md` to `/mnt/c/folder/file.md`).

You can toggle these settings in the plugin's settings tab.

## Attribution

This plugin is a fork of the original [Copy Path plugin](https://github.com/shumadrid/obsidian-copy-path) by [shumadrid](https://github.com/shumadrid), with added WSL path conversion functionality.
