const quick  = require('quick-tmp')('firefox-launch')
const spawn  = require('child_process').spawn
const ffox   = require('firefox-location')
const copy   = require('shallow-copy')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const path   = require('path')
const fs     = require('fs')

module.exports = launchFirefox

function launchFirefox(uri, opts) {
  var closed = false

  opts = Array.isArray(opts) ? { args: opts } : opts
  opts = copy(opts || {})

  var tmp  = opts.dir || quick()
  var args = [
        uri
      , '-new-instance'
      , '-no-remote'
      , '-purgecaches'
      , '-profile', tmp
  ].concat(opts.args || [])

  mkdirp.sync(tmp)
  if (opts.pref !== false) {
    fs.writeFileSync(path.join(tmp, 'user.js'), opts.pref || [
        'user_pref("browser.shell.checkDefaultBrowser", false);'
      , 'user_pref("browser.bookmarks.restore_default_bookmarks", false);'
      , 'user_pref("dom.allow_scripts_to_close_windows", true);'
      , 'user_pref("dom.disable_open_during_load", false);'
      , 'user_pref("dom.max_script_run_time", 0);'
    ].join('\n'))
  }

  var ps = spawn(ffox, args, {
    env: opts.env || process.env
  })

  // don't remove tmp dir automatically if
  // supplied a custom one, don't want it getting
  // nuked unknowingly!
  if (!opts.dir || opts.nuke) {
    process.on('exit', onClose)
    process.on('close', onClose)
    ps.on('close', onClose)
  }

  return ps

  function onClose() {
    if (closed) return; closed = true
    ps.kill()
    process.removeListener('exit', onClose)
    process.removeListener('close', onClose)

    try {
      rimraf.sync(tmp)
    } catch(e) {
      rimraf.sync(tmp)
    }
  }
}
