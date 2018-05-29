const { BrowserWindow, shell, dialog } = require('electron')
const os = require('os')
const url = require('url')
const path = require('path')
let template = [{
  label: '文件',
  submenu: [{
    label: '打开根目录文件夹',
    accelerator: 'N',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        shell.showItemInFolder(os.homedir())
      }
    }
  },
  {
    label: '新建窗口',
    accelerator: 'Shift+CmdOrCtrl+Z',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        let win = new BrowserWindow({
          width: 500,
          height: 500
        })
        win.loadURL(url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file',
          slashes: true
        }))
        win.on('closed', () => {
          win = null
        })
      }
    }
  },
  {
    label: '打开文件夹',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        dialog.showOpenDialog({
          properties: ['openFile', 'openDirectory']
        }, (files) => {
          focusedWindow.webContents.send('ping', files)
        })
      }
    }
  }
  ]
},
{
  label: '视图',
  submenu: [{
    label: '刷新',
    accelerator: 'CmdOrCtrl+R',
    click: (item, focusedWindow) => {
      console.log(item, focusedWindow)
      if (focusedWindow) {
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(win => {
            if (win.id > 1) win.close()
          })
        }
      }
      focusedWindow.reload()
    }
  },
  {
    label: '全屏',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'ctrl+Command+F'
      } else {
        return 'alt+1'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  },
  {
    label: '开发者工具',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  },
  {
    label: '测试1号',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: '我是一段测试文字',
          buttons: ['Ok'],
          message: 'electron测试文字1号'
        }
        dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }
  ]
}
]

export default template
