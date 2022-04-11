const FS = require("fs")
const inquirer = require("inquirer")
const VueTemplate = require("./VueTemplate/index.ts")
const ui = new inquirer.ui.BottomBar();

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
        when:(answers)=>{
          return answers.type !== 'QueryTable'
        }
      }
    ]).then((options) => {
      console.log('您选择的配置项为', options);
      createTemplate(options)
    }).catch((error) => {
      console.log(`创建失败 -------------------------------------------------------------------${error}`,);
    });

}

const createTemplate = (options) => {
  const { template_name, type, langType, cssLoader, axios } = options;
  FS.readFile(`src/views/${template_name}/index.vue`, function(err, data) {
    if(data) {
      console.log(`创建失败 -------------------------------------------------------------------该命名文件已存在`,);
    }else{
      const addConfig = {
        cssLoader,
        langType,
        axios
      }
      FS.mkdirSync(`src/views/${template_name}`)
      switch (type) {
        case "vue2":
          FS.writeFileSync(`src/views/${template_name}/index.vue`, VueTemplate.createVueTemplate(addConfig))
          break;
        case "QueryTable":
          FS.writeFileSync(`src/views/${template_name}/index.vue`, VueTemplate.createQueryTable(addConfig))
          break;
        default:
          FS.writeFileSync(`src/views/${template_name}/index.vue`, VueTemplate.createVueSetupTemplate(addConfig))
      }
      console.log('创建成功 --------------------------------------------------------------------------------------------------------------------------',);
    }
  })

}




create()