import type { TAbstractFile } from 'obsidian';

import { Notice } from 'obsidian';
import { PluginBase } from 'obsidian-dev-utils/obsidian/Plugin/PluginBase';

import type { CopyPathPluginTypes } from './PluginTypes.ts';

import { CopyPathPluginSettingsManager } from './PluginSettingsManager.ts';
import { CopyPathPluginSettingsTab } from './PluginSettingsTab.ts';

export class CopyPathPlugin extends PluginBase<CopyPathPluginTypes> {
  protected override createSettingsManager(): CopyPathPluginSettingsManager {
    return new CopyPathPluginSettingsManager(this);
  }

  protected override createSettingsTab(): CopyPathPluginSettingsTab {
    return new CopyPathPluginSettingsTab(this);
  }

  protected override async onloadImpl(): Promise<void> {
    await super.onloadImpl();

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (this.settings.copyVaultPathContextItem) {
          menu.addItem((item) => {
            item
              .setSection('info')
              .setTitle('Copy vault path')
              .setIcon('copy')
              .onClick(async () => {
                await copyVaultPath(file);
              });
          });
        }

        if (this.settings.copyFullPathContextItem) {
          menu.addItem((item) => {
            item
              .setSection('info')
              .setTitle('Copy full path')
              .setIcon('copy')
              .onClick(async () => {
                await copyFullPath(file, this);
              });
          });
        }

        if (this.settings.copyWSLPathContextItem) {
          menu.addItem((item) => {
            item
              .setSection('info')
              .setTitle('Copy WSL path')
              .setIcon('copy')
              .onClick(async () => {
                await copyWSLPath(file, this);
              });
          });
        }
      })
    );
  }
}

async function copyFullPath(
  file: TAbstractFile,
  plugin: CopyPathPlugin
): Promise<void> {
  const absolutePath = plugin.app.vault.adapter.getFullRealPath(file.path);
  await navigator.clipboard.writeText(absolutePath);
  // eslint-disable-next-line no-magic-numbers
  new Notice(`Copied full path:\n${absolutePath}`, 2000);
}

// Is normalized.
async function copyVaultPath(file: TAbstractFile): Promise<void> {
  const vaultPath = file.path;
  await navigator.clipboard.writeText(vaultPath);
  // eslint-disable-next-line no-magic-numbers
  new Notice(`Copied vault path:\n${vaultPath}`, 2000);
}

function convertWindowsPathToWSL(windowsPath: string): string {
  // Convert Windows path to WSL mount format
  // C:\path\to\file -> /mnt/c/path/to/file
  const normalized = windowsPath.replace(/\\/g, '/');
  const driveMatch = normalized.match(/^([A-Za-z]):/);
  
  if (driveMatch && driveMatch[1]) {
    const driveLetter = driveMatch[1].toLowerCase();
    const pathWithoutDrive = normalized.substring(2);
    return `/mnt/${driveLetter}${pathWithoutDrive}`;
  }
  
  // If no drive letter found, return as-is with forward slashes
  return normalized;
}

async function copyWSLPath(
  file: TAbstractFile,
  plugin: CopyPathPlugin
): Promise<void> {
  const absolutePath = plugin.app.vault.adapter.getFullRealPath(file.path);
  const wslPath = convertWindowsPathToWSL(absolutePath);
  await navigator.clipboard.writeText(wslPath);
  // eslint-disable-next-line no-magic-numbers
  new Notice(`Copied WSL path:\n${wslPath}`, 2000);
}
