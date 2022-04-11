// @ts-nocheck
const FS = require("fs")
const inquirer = require("inquirer")
const VueTemplate = require("./VueTemplate/index.ts")
const ui = new inquirer.ui.BottomBar();

// 创建成功提示
const successLog = () => {
  console.log('success ----------------------------------------------------------------------------------');
}

// 创建失败提示
const errorLog = (error) => {
  console.log(`error -------------------------------------------------------------------${error || '该命名文件已存在'}`);
}

// 默认执行函数
const create = () => {
  inquirer.prompt(
    [
      {
        name: "template_name",
        type: "input",
        message: "请输入要创建的模版名称?",
        default: "default"
      },
      {
        type: 'list',
        name: 'langType',
        message: '请选择语法',
        choices: ['ts', 'js'],
        default: 'ts',
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择vue语法模版',
        choices:
          [
            'setup',
            'vue2',
            new inquirer.Separator(),
            'QueryTable'
          ],
        default: 'setup',
      },
      {
        name: 'cssLoader',
        message: 'CSS预处理器名字',
        type: 'list',
        choices: ['less', 'css', 'sass'],
        default: 'css',
      },
      {
        type: 'confirm',
        name: 'axios',
        message: '是否需要初始化请求',
        when: (answers) => {
          return answers.type !== 'QueryTable'
        }
      }
    ]).then((options) => {
      createTemplate(options)
    }).catch((error) => {
      errorLog(error)
    });
}


// 创建模版处理函数
const createTemplate = (options) => {
  const { template_name, type, langType, cssLoader, axios } = options;
  FS.readFile(`src/views/${template_name}/index.vue`, function (err, data) {
    if (data) {
      errorLog()
      inquirer.prompt(
        [
          {
            type: 'confirm',
            name: 'iscover',
            message: '是否要覆盖该文件夹',
          }
        ]).then(({ iscover }) => {
          if (iscover) {
            writeFs(options, 'writeFile')
            successLog()
          } else {
            errorLog('请重新创建')
          }
        }).catch((error) => {
          errorLog(error)
        });
    } else {
      FS.mkdirSync(`src/views/${template_name}`)
      writeFs(options, 'writeFileSync')
      successLog()
    }
  })
}


// 创建 template 函数
const writeFs = (options, writeFileType) => {
  const { template_name, type, langType, cssLoader, axios } = options;
  const addConfig = {
    cssLoader,
    langType,
    axios
  }
  switch (type) {
    case "vue2":
      FS[writeFileType](`src/views/${template_name}/index.vue`, VueTemplate.createVueTemplate(addConfig), () => { })
      break;
    case "QueryTable":
      FS[writeFileType](`src/views/${template_name}/index.vue`, VueTemplate.createQueryTable(addConfig), () => { })
      break;
    default:
      FS[writeFileType](`src/views/${template_name}/index.vue`, VueTemplate.createVueSetupTemplate(addConfig), () => { })
  }
}



create()