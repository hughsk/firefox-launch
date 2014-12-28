# firefox-launch
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/firefox-launch.svg?style=flat)
![](http://img.shields.io/npm/dm/firefox-launch.svg?style=flat)
![](http://img.shields.io/npm/l/firefox-launch.svg?style=flat)

Light cross-platform launcher for Firefox.

## Usage

[![NPM](https://nodei.co/npm/firefox-launch.png)](https://nodei.co/npm/firefox-launch/)

### `process = spawn(url, [options])`

Spawns a new Firefox instance in a separate process using
[`child_process.spawn`](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

Options include:

* `pref`: [preference file](https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/A_brief_guide_to_Mozilla_preferences)
  contents to use. Set to `false` to not create a file.
* `args`: additional command-line arguments to pass to Firefox. See
  [here](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options)
  for more information.
* `dir`: user configuration directory to use. By default, one will be
  created and then removed when the process is killed.
* `env`: environment variables to use. Defaults to `process.env`.
* `nuke`: remove `opts.dir` when the process exits.

Unless overridden with `opts.config`, the following preferences will be used:

``` javascript
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.bookmarks.restore_default_bookmarks", false);
user_pref("dom.allow_scripts_to_close_windows", true);
user_pref("dom.disable_open_during_load", false);
user_pref("dom.max_script_run_time", 0);
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/firefox-launch/blob/master/LICENSE.md) for details.
