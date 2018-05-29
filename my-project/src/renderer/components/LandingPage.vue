<template>
  <div id="wrapper">
    <aside class="silder-nav">
      <div class="nav-main">
        <h3 class="title">资源管理器</h3>
        <div class="flilset">
          <el-tree
            @node-expand="fileExpand"
            @node-click="fileClick"
            @node-contextmenu="fileContext"
            :highlight-current="true"
            :data="files">
            node-key
          </el-tree>
        </div>
      </div>
    </aside>
    <article class="app-main">
      <header class="app-head">
        <el-button type="sucess" @click="sortDesc">Id排序</el-button>
      </header>
      <div class="app-content">
        <div v-for="(excelname, sheetindex) in excelData" @click.stop='excleSheet(sheetindex)'>{{excelname.name}}</div>
        <table ref="table" @dblclick="tableClick" refs="table" class="table is_bordered">
          <thead>
          </thead>
          <tbody>
            <tr v-for="excle in excelData[index].data">
              <td v-for="item in excle">{{item}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <excelSheet>
        </excelSheet> -->
      </div>
    </article>
  </div>
</template>

<script>
  import fs from 'fs'
  import xlsx from 'node-xlsx'
  import excelSheet from './common/sheetOfExcel'
  import order from '../utils/heapSort'
  export default {
    name: 'landing-page',
    data () {
      return {
        files: [{
          label: '',
          isLeaf: true,
          filePath: String,
          children: []
        }],
        fileContent: '',
        index: 0,
        excelData: [
          {data: Array}
        ]
      }
    },
    components: {
      excelSheet
    },
    methods: {
      fileExpand (data) {
        console.log(2222)
        if (data.isLeaf) {
          if (data.children[0].label === '') {
            data.children = []
            fs.readdir(data.filePath, (err, files) => {
              if (err) {
                console.log('err:/fire readir err' + err)
                return
              }
              files.forEach((fileName) => {
                if (fs.statSync(data.filePath + `\\${fileName}`).isDirectory()) {
                  data.children.push({
                    label: fileName,
                    filePath: data.filePath + `\\${fileName}`,
                    isLeaf: fs.statSync(data.filePath + `\\${fileName}`).isDirectory(),
                    children: [{
                      label: ''
                    }]
                  })
                } else {
                  data.children.push({
                    label: fileName,
                    filePath: data.filePath + `\\${fileName}`,
                    isLeaf: fs.statSync(data.filePath + `\\${fileName}`).isDirectory()
                  })
                }
              })
            })
          }
        }
      },
      fileClick (data) {
        this.index = 0
        if (!data.isLeaf) {
          if (data.filePath.split('.')[1] !== 'xls' && data.filePath.split('.')[1] !== 'xlsx') {
            alert('不支持除xls与xlsx格式的文件')
            return
          }
          let excelData = xlsx.parse(data.filePath)
          console.log(excelData)
          this.excelData = excelData
          let readerStream = fs.createReadStream(data.filePath)
          readerStream.setEncoding('UTF8')
          readerStream.on('data', function (chunk) {
            data += chunk
          })
          readerStream.on('end', () => {
            this.fileContent = data
          })
          readerStream.on('error', function (err) {
            console.log(err.stack)
          })
        }
      },
      fileContext (data) {
        console.log(data)
      },
      excleSheet (index) {
        this.index = index
      },
      tableClick (event) {
        if (event.target.nodeName.toLowerCase() !== 'td') return
        let node = document.createElement('input')
        node.value = event.target.innerText
        node.style.width = '100%'
        node.style.height = '100%'
        node.style.position = 'absolute'
        node.style.top = '-2px'
        node.style.left = '-1px'
        event.target.appendChild(node)
        node.focus()
        node.onblur = () => {
          event.target.innerText = node.value
        }
      },
      sortDesc () {
        console.log(order)
      }
    },
    created () {
      const { ipcRenderer } = this.$electron
      ipcRenderer.send('text', 'i am test')
      ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(111111)
        console.log(event.sender, arg)
      })
      ipcRenderer.on('ping', (item, path) => {
        console.log(item.sender._eventsCount, path)
        this.files[0].filePath = path[0]
        this.files[0].children = []
        let rootName = path[0].split('\\')
        this.files[0].label = rootName[rootName.length - 1]
        fs.readdir(path[0], (err, files) => {
          if (err) {
            console.log('err:/fire readir err' + err)
            return
          }
          files.forEach((fileName) => {
            if (fs.statSync(path[0] + `\\${fileName}`).isDirectory()) {
              this.files[0].children.push({
                label: fileName,
                filePath: path[0] + `\\${fileName}`,
                isLeaf: fs.statSync(path[0] + `\\${fileName}`).isDirectory(),
                children: [{
                  label: ''
                }]
              })
            } else {
              this.files[0].children.push({
                label: fileName,
                filePath: path[0] + `\\${fileName}`,
                isLeaf: fs.statSync(path[0] + `\\${fileName}`).isDirectory()
              })
            }
          })
        })
      })
    }
  }
</script>

<style lang="scss">
  #wrapper {
    height: 100%;
    overflow-y: auto;
  }
  .app-head {
    height: 50px;
    background-color: blue;
  }
  .silder-nav{
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: pink;
    position: absolute;
  }
  .app-main {
    box-sizing: border-box;
    width: 100%;
    height:1000px;
    background-color: yellow;
    padding-left :200px;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    overflow: visible;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #000;
    opacity: 0;
    border: solid transparent;
    border-width: 1px 0 1px 0;
    background-clip: padding-box;
  }
  /* table */
  @charset "UTF-8";

.table {
  box-sizing: border-box;
  background-color: #fff;
  color: #222324;
  margin-bottom: 20px;
  width: 100%;
  border-collapse:collapse;
}

.table td,
.table th {
  border: 1px solid #d3d6db;
  border-width: 0 0 1px;
  padding: 8px 10px;
  vertical-align: top;
}

.table td.is_icon,
.table th.is_icon {
  padding: 5px;
  text-align: center;
  white-space: nowrap;
  width: 1%;
}

.table td.is_icon .fa,
.table th.is_icon .fa {
  display: inline-block;
  font-size: 21px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  vertical-align: top;
  width: 24px;
}

.table td.is_icon.is_link,
.table th.is_icon.is_link {
  padding: 0;
}

.table td.is_icon.is_link > a,
.table th.is_icon.is_link > a {
  padding: 5px;
}

.table td.is_link,
.table th.is_link {
  padding: 0;
}

.table td.is_link > a,
.table th.is_link > a {
  display: block;
  padding: 8px 10px;
}

.table td.is_link > a:hover,
.table th.is_link > a:hover {
  background-color: #1fc8db;
  color: white;
}

.table td.is_narrow,
.table th.is_narrow {
  white-space: nowrap;
  width: 1%;
}

.table th {
  color: #222324;
  text-align: left;
}

.table tr:hover {
  background-color: #f5f7fa;
  color: #222324;
}

.table thead td,
.table thead th {
  border-width: 0 0 2px;
  color: #aeb1b5;
}

.table tbody tr:last-child td,
.table tbody tr:last-child th {
  border-bottom-width: 0;
}

.table tfoot td,
.table tfoot th {
  border-width: 2px 0 0;
  color: #aeb1b5;
}

.table.is_bordered td,
.table.is_bordered th {
  border-width: 1px;
}

.table.is_bordered tr:last-child td,
.table.is_bordered tr:last-child th {
  border-bottom-width: 1px;
}

.table.is_narrow td,
.table.is_narrow th {
  padding: 5px 10px;
}

.table.is_narrow td.is_icon,
.table.is_narrow th.is_icon {
  padding: 2px;
}

.table.is_narrow td.is_icon.is_link,
.table.is_narrow th.is_icon.is_link {
  padding: 0;
}

.table.is_narrow td.is_icon.is_link > a,
.table.is_narrow th.is_icon.is_link > a {
  padding: 2px;
}

.table.is_narrow td.is_link,
.table.is_narrow th.is_link {
  padding: 0;
}

.table.is_narrow td.is_link > a,
.table.is_narrow th.is_link > a {
  padding: 5px 10px;
}

.table.is_striped tbody tr:hover {
  background-color: #eef2f7;
}

.table.is_striped tbody tr:nth-child(2n) {
  background-color: #f5f7fa;
}

.table.is_striped tbody tr:nth-child(2n):hover {
  background-color: #eef2f7;
}
  table {
  /* table不卡起决定性作用 */
    transform: translate3d(0, 0, 0);
    margin-bottom: 0;
  }

  .first-col {
    background-color: #eee
  }

  table thead tr th,
  table thead th:hover,
  table tbody tr td:first-child,
  table tbody tr td:first-child:hover {
    background-color: #eee;
  }
</style>
<style lang="scss">
/* 由于td是自己后续加的，没有添加vue属性，放在 scoped里面则不会匹配这些样式 */

  .excel_area tbody tr:first-child td {
    white-space: nowrap;
  }

  table {
    overflow: hidden
  }

  tbody td {
    position: relative;
    &:hover {
      &::after {
        content: "\20";
        position: absolute;
        height: 10000px;
        width: 100%;
        left: 0;
        top: -5000px;
        background-color: #f5f7fa;
        z-index: -1;
      }
    }
  }
  .sheet_of_excel thead>tr:first-child>th {
    &:first-child {
      position: relative;
      background-image: linear-gradient(to top right, transparent, transparent calc(50% - 0.5px), #d3d6db calc(50% - 0.5px), #d3d6db calc(50% + 0.5px), transparent calc(50% + 0.5px));
      &::before {
        content: "列";
        width: 50%;
        text-align: center;
        position: absolute;
        right: 0;
        top: 3px;
      }
      &::after {
        content: "行";
        width: 50%;
        position: absolute;
        text-align: center;
        left: 0;
        bottom: 3px;
      }
    }
  }
</style>

