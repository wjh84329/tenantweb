<!--
 * @Description: 安装分区
 * @Author: gao shuai
 * @Date: 2020-03-04 16:21:57
 * @LastEditTime: 2020-09-10 10:48:08
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_title" style="color: white;">安装分区</div>
      <div class="gs_listcontainer">
        <dl class="clearfix">
          <dt>分区类型：</dt>
          <dd>
            <ul class="areaContainer clearfix">
              <li :class="{ on: typeindex === 1 }" @click="typeChange(1)">
                <el-tooltip class="item" effect="dark" content="热血传奇" placement="bottom">
                  <img src="../assets/images/index.png" alt="" />
                </el-tooltip>
              </li>
              <!-- <li :class="{ on: typeindex === 2 }" @click="typeChange(2)">
                <el-tooltip class="item" effect="dark" content="传奇世界" placement="bottom">
                  <img src="../assets/images/cs.png" alt="" />
                </el-tooltip>
              </li> -->
            </ul>

          </dd>
        </dl>
        <dl class="clearfix">
          <dt></dt>
          <dd>
            <span class="inputbox">
              <el-checkbox v-model="batchAdd" @change="isbatchAdd">批量添加分区</el-checkbox>
            </span>
          </dd>
        </dl>
        <!-- 批量添加分区模式 -->
        <template v-if="batchAdd">
          <dl class="clearfix" v-for="(item, idx) in batchList" :key="idx">
            <dt>分区名称：</dt>
            <dd style="display: flex; align-items: center;">
              <el-input
                style="width:180px;margin-right:10px;"
                size="small"
                v-model="item.name"
                placeholder="分区名称"
              ></el-input>
              <span style="margin-right:10px;display:flex;align-items:center;">
                <span style="margin-right:5px;">安装路径：</span>
                <el-input
                  style="width:220px;margin-right:10px;"
                  size="small"
                  v-model="item.path"
                  placeholder="安装路径"
                ></el-input>
              </span>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="removeBatch(idx)"
                v-if="batchList.length > 1 && idx !== 0"
              >删除</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="addBatch"
                v-if="idx === 0"
              >添加</el-button>
            </dd>
          </dl>
        </template>
        <dl class="clearfix" v-if="!batchAdd">
          <dt>分区名称：</dt>
          <dd>
            <span class="inputbox">
              <el-input style="width: 250px" size="small" ref="partName" v-model="partName"
                placeholder="请输入内容"></el-input>
            </span>
            <span class="line_tip">3-30个字符，请勿输入特殊符号</span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="!batchAdd">
          <dt>安装路径：</dt>
          <dd>
            <span class="inputbox">
              <el-input style="width: 250px" size="small" ref="installPath" v-model="installPath"
                placeholder="请输入内容"></el-input>
            </span>
            <span class="block_tip">分区安装脚本目录或INI文件存放路径</span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="!batchAdd">
          <dt></dt>
          <dd>
            <span class="inputbox">
              <el-checkbox v-model="partChecked">在指定时间更改分区名称</el-checkbox>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="partChecked">
          <dt>更改名称：</dt>
          <dd>
            <span class="inputbox">
              <el-input style="width: 250px" size="small" ref="changeName" v-model="changeName"
                placeholder="请输入内容"></el-input>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-show="partChecked">
          <dt>更改时间：</dt>
          <dd>
            <span class="inputbox">
              <el-date-picker style="width: 250px" size="small" ref="changeTime" value-format="yyyy-MM-dd HH:mm:ss"
                v-model="changeTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>分组：</dt>
          <dd>
            <span class="inputbox clearfix gs_checkbox pdt5" style="width: 700px">
              <el-checkbox-group class="fl" style="max-width: 600px" v-model="teamdata.teamlist" @change="teamchange">
                <el-checkbox v-for="(team, i) in teamdata.Options" :label="team.id" :key="'team' + i">{{ team.name
                  }}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox class="fl mgl20" :indeterminate="teamdata.isIndeterminate" v-model="teamdata.teamAll"
                @change="teamAllChange">全选</el-checkbox>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex == 1 || typeindex == 2 || typeindex == 6">
          <p class="tip_red" style="margin: 0">
            注意：创建分区前请先把客户端运行起来,网关标识即为客户端上的标识
          </p>
          <dt>网关标识：</dt>
          <dd>
            <span class="inputbox">

              <slect-drow :itemList="serverDrow" @delitem="delequipcode" :slect.sync="serverIp"
                style="width: 250px"></slect-drow>

            </span>
            <span class="block_tip">安装分区前请先运行网关客户端</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>模 板：</dt>
          <dd>
            <span class="inputbox">
              <el-select style="width: 250px" size="small" ref="installModel" v-model="installModel" placeholder="请选择">
                <el-option v-for="(item, i) in modelDrow" :key="'yq' + i" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <router-link :to="{ path: '/main/partinstallmod' }" tag="span" class="mgl20">
                <el-button size="small" type="primary">添加</el-button>
              </router-link>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 1 || typeindex === 2">
          <dt>元宝蛋：</dt>
          <dd>
            <span class="inputbox pdt5">
              <el-radio-group v-model="glodEgg">
                <el-radio :label="true">开启</el-radio>
                <el-radio :label="false">关闭</el-radio>
              </el-radio-group>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 1 || typeindex === 2">
          <dt>充值方式：</dt>
          <dd>
            <span class="inputbox pdt5">
              <el-radio-group v-model="glodScan">
                <el-radio :label="2">网页扫码</el-radio>
                <el-radio :label="0">游戏内扫码</el-radio>
                <el-radio :label="1">以上两者</el-radio>
              </el-radio-group>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="glodScan==1 || glodScan==0">
          <dt>补丁下载：</dt>
          <dd>
            <span class="inputbox gs_textarea">
              <div style="color: #333;text-decoration: none;font-size: 14px;"  @click="gorout">点击下载补丁</div>
            </span>
            <span class="tip_red">选择游戏内扫码许下载补丁文件放入游戏中，补丁默认编号是44，序号是4</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>分区公告：</dt>
          <dd>
            <span class="inputbox gs_textarea">
              <el-input type="textarea" placeholder="请输入内容" v-model="notice"></el-input>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 4">
          <dt>数据库配置：</dt>
          <dd>
            <ul class="sqlsetbox">
              <li class="clearfix">
                <span class="tit">类型 :</span>
                <div class="cont">
                  <el-select size="small" style="width: 200px" v-model="baseSql.type" placeholder="请选择">
                    <el-option label="MySQL" :value="0"></el-option>
                    <el-option label="SQL Server" :value="2"></el-option>
                  </el-select>
                </div>
              </li>
              <li class="clearfix">
                <span class="tit">I P :</span>
                <div class="cont">
                  <el-input size="small" ref="baseSqlip" v-model="baseSql.ip" placeholder="请输入内容"></el-input>
                </div>
                <span class="tit mgl15">端 口 :</span>
                <div class="cont">
                  <el-input size="small" style="width: 100px" type="number" ref="baseSqlport" v-model="baseSql.port"
                    placeholder="请输入内容"></el-input>
                </div>
              </li>
              <li class="clearfix">
                <span class="tit">数据库 :</span>
                <div class="cont">
                  <el-input size="small" ref="baseSqlDbName" v-model="baseSql.dbName" placeholder="请输入数据库名称"></el-input>
                </div>
              </li>
              <li class="clearfix">
                <span class="tit">用户名 :</span>
                <div class="cont">
                  <el-input size="small" ref="baseSqluser" v-model="baseSql.user" placeholder="请输入内容"></el-input>
                </div>
                <span class="tit mgl15">密 码 :</span>
                <div class="cont">
                  <el-input size="small" ref="baseSqlpwd" v-model="baseSql.pwd" placeholder="数据库连接密码"></el-input>
                </div>
              </li>
              <li class="clearfix">
                <span class="tit">S Q L :</span>
                <div class="cont gs_textarea1">
                  <el-input type="textarea" ref="baseSqlsql" v-model="baseSql.sql"
                    placeholder="如： INSERT INTO `charge` (`id`, `accountname`, `coin`,`state`,`add_time`,`update_time`,`deleted`,`money`,`type`) VALUES (null, '@USER@',@SUM@,0,NOW(),NOW(),0,@MONEY@,NULL);"></el-input>
                </div>
              </li>
            </ul>
            <p style="color: #aaa; font-size: 14px; padding-left: 10px">
              1.多条sql请用";"隔开 2.账号变量:@USER@ 游戏币数量:@SUM@ 金额：@MONEY@ 代理：@DL@
            </p>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 5">
          <dt>WEB通讯：</dt>
          <dd>
            <ul class="sqlsetbox">
              <li class="clearfix">
                <span class="tit bigwidth">提交地址 :</span>
                <div class="cont">
                  <el-input size="small" ref="webSetaddress" v-model="webSet.address" style="width: 325px"
                    placeholder="请输入内容"></el-input>
                  <!-- <span class="line_tip">3-30个字符，请勿输入特殊符号</span> -->
                </div>
              </li>
              <li class="clearfix">
                <span class="tit bigwidth">附加参数 :</span>
                <div class="cont gs_textarea1">
                  <el-input type="textarea" ref="webSetdatatype" v-model="webSet.datatype"
                    placeholder="请输入内容"></el-input>
                </div>
              </li>
              <li class="clearfix">
                <span class="tit bigwidth">跳转地址 :</span>
                <div class="cont">
                  <el-input size="small" ref="webSetsuccessmark" v-model="webSet.successmark" style="width: 325px"
                    placeholder="请输入内容"></el-input>
                  <span class="line_tip">即同步通地址,不能带参数。一般可以不填写</span>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>定时开区：</dt>
          <dd>
            <span class="inputbox">
              <el-date-picker
                style="width: 190px"
                size="small"
                v-model="setTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </span>
            <span class="line_tip">系统将在您指定的时间开始提供充值服务(时间超过现在5分钟，即为开启定时开区,开区前5分钟执行加载脚本)</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>定时删区：</dt>
          <dd>
            <span class="inputbox">
              <el-checkbox v-model="setDelType">系统将在您指定的时间删除分区</el-checkbox>
            </span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>删区时间：</dt>
          <dd>
            <span class="inputbox">
              <el-date-picker style="width: 250px" size="small" v-model="setDelTime" value-format="yyyy-MM-dd HH:mm:ss"
                :clearable="false" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 1 || typeindex === 2">
          <dt></dt>
          <dd>
            <span class="inputbox">
              <!-- <el-checkbox v-model="iscreatjb">创建脚本，系统将在您服务器上创建充值脚本</el-checkbox> -->
              <el-radio-group v-model="iscreatjb">
                <el-radio :label="0">不更新脚本</el-radio>
                <el-radio :label="1">仅更新充值脚本</el-radio>
                <el-radio :label="2">全部更新</el-radio>
              </el-radio-group>
            </span>
            <span class="line_tip">设置了定时开区，该处功能将会失效</span>
          </dd>
        </dl>
        <dl class="clearfix" v-if="typeindex === 1 || typeindex === 2">
          <dt></dt>
          <dd>
            <span class="inputbox">
              <span style="color: red">如果现在不需要创建脚本，您可以在分区管理中加载脚本</span>
            </span>
          </dd>
        </dl>
      </div>
      <p class="tc pdb20">
        <el-button type="primary" @click="partinstall" :loading="!installFlag">保存</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import slectDrow from '../components/selcetDrow';
export default {
  components: {
    slectDrow
  },
  data() {
    return {
      installFlag: true, // 保存按钮中的防重复点击
      typeindex: 1, // 分区类型
      partName: '', // 分区名称
      partChecked: false, // 在指定时间更改分区名称
      changeName: '', // 更改名称
      changeTime: this.getNewTime(), // 更改时间
      teamdata: {
        // 分组
        teamAll: false,
        teamlist: [],
        Options: [], // 分组的多选list
        isIndeterminate: true
      },
      serverIp: '', // 机器码
      serverDrow: [], // 机器码下拉
      // serverPort: 6379, // 通讯端口
      installPath: 'D:\\MirServer', // 安装路径
      installModel: '', // 模板
      modelDrow: [], // 模板的下拉
      glodEgg: false, // 元宝蛋
      glodScan: 2, // 扫码充值
      notice: '', // 分区公告
      baseSql: {
        type: 0, // 类型
        ip: '', // ip
        port: '', // 端口
        user: '', // 用户名
        pwd: '', // 用户名
        sql: '', // SQL
        dbName: ''
      },
      webSet: {
        address: '', // 接收地址
        successmark: '', // 成功标识
        datatype: '' // 数据格式
      },
      setTime: this.getNewTime(), // 定时开区
      setDelType: false, // 定时删区
      setDelTime: this.getNewTime(), // 定时删区时间
      iscreatjb: 2, // 创建脚本
      batchAdd: false, // 是否批量添加分区
      batchList: [
        { name: '', path: 'D:\\MirServer' }
      ]
    };
  },
  methods: {
    // 跳转微信密保
    gorout() {
      this.$router.push({ path: '/personal/wechat', query: { tab: 'ewmmb' } });
    },
    // 分区类型的切换
    typeChange(index) {
      this.typeindex = index;
      console.log(index);
      this.installModel = '';
      this.modelDrowList();
      if (index === 3) {
        this.glodEgg = false;
        this.glodScan = 2;
        this.iscreatjb = 2;
      } else if (index === 1 || index === 2) {
        this.installPath = 'D:\\MirServer';
      }
    },
    // 获取用户分组
    groupsdrow() {
      this.$api.partinstall
        .groupsdrow()
        .then((data) => {
          this.teamdata.Options = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取用户模板下拉
    modelDrowList() {
      this.$api.partinstall
        .modelDrow({ templatesType: this.typeindex })
        .then((data) => {
          this.modelDrow = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 安装时，数据的检验
    dataChecked() {
      if (this.partName === '') {
        this.$nextTick(() => {
          this.$refs.partName.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.partChecked && this.changeName === '') {
        this.$nextTick(() => {
          this.$refs.changeName.focus();
          this.$messageError('更改名称不能为空，并且为1-30个字符');
        });
        return true;
      } else if (JSON.stringify(this.teamdata.teamlist) === '[]') {
        this.$messageError('请选择游戏分组！');
        return true;
      } else if ((this.typeindex === 1 ||
        this.typeindex === 2 ||
        this.typeindex === 3) &&
        this.serverIp === '') {
        this.$nextTick(() => {
          this.$refs.serverIp.focus();
          this.$messageError('请选择机器码！');
        });
        return true;
      } else if (
        (this.typeindex === 1 ||
          this.typeindex === 2 ||
          this.typeindex === 3) &&
        this.installPath === ''
      ) {
        this.$nextTick(() => {
          this.$refs.installPath.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.installModel === '') {
        this.$nextTick(() => {
          this.$refs.installModel.focus();
          this.$messageError('请选择模板！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.ip === '') {
        this.$nextTick(() => {
          this.$refs.baseSqlip.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.dbName === '') {
        this.$nextTick(() => {
          this.$refs.baseSqlDbName.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.port === '') {
        this.$nextTick(() => {
          this.$refs.baseSqlport.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.user === '') {
        this.$nextTick(() => {
          this.$refs.baseSqluser.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.pwd === '') {
        this.$nextTick(() => {
          this.$refs.baseSqlpwd.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 4 && this.baseSql.sql === '') {
        this.$nextTick(() => {
          this.$refs.baseSqlsql.focus();
          this.$messageError('必须填写！');
        });
        return true;
      } else if (this.typeindex === 5 && this.webSet.address === '') {
        // 提交地址
        this.$nextTick(() => {
          this.$refs.webSetaddress.focus();
          this.$messageError('必须填写！');
        });
        return true;
      }
      // } else if (this.typeindex === 5 && this.webSet.datatype === '') {
      //   this.$nextTick(() => {
      //     this.$refs.webSetdatatype.focus();
      //     this.$messageError('必须填写！');
      //   });
      //   return true;
      // }
      return false;
    },
    // 安装分区
    partinstall() {
      if (this.installFlag) {
        this.installFlag = false;
        if (this.batchAdd) {
          // 批量模式
          // 校验
          console.log(this.batchList);
          for (let i = 0; i < this.batchList.length; i++) {
            if (!this.batchList[i].name || !this.batchList[i].path) {
              this.$messageError(`第${i + 1}项分区名称和路径不能为空`);
              this.installFlag = true;
              return;
            }
          }
          if (JSON.stringify(this.teamdata.teamlist) === '[]') {
            this.$messageError('请选择游戏分组！');
            this.installFlag = true;
            return;
          }
          if (this.installModel === '') {
            this.$messageError('请选择模板！');
            this.installFlag = true;
            return;
          }
          // 组装参数
          const names = this.batchList.map(item => item.name);
          const scriptPaths = this.batchList.map(item => item.path);
          const model = {
            name: '1',
            type: this.typeindex,
            dataFormat: this.webSet.datatype,
            dbInfo: {
              type: this.baseSql.type,
              ip: this.baseSql.ip,
              port:
                  this.baseSql.port === '' ? 0 : parseFloat(this.baseSql.port),
              user: this.baseSql.user,
              pwd: this.baseSql.pwd,
              sql: this.baseSql.sql,
              dbName: this.baseSql.dbName
            }, // 数据库配置对象
            isChangeInTime: this.partChecked,
            useName: this.changeName,
            changeDate: this.changeTime,
            notice: this.notice,
            machineCode: this.serverIp,
            successMark: this.webSet.successmark,
            useDate: this.setTime,
            webUrl: this.webSet.address,
            ybEgg: this.glodEgg,
            scan: this.glodScan,
            templateId: this.installModel,
            groups: this.teamdata.teamlist.map(id => ({ id })),
            partitionCmdType: this.iscreatjb
          };
          // 调用批量接口
          this.$api.partinstall
            .batchInstall(model, names, scriptPaths)
            .then(data => {
              if (data.status === 200) {
                this.dataInit();
                this.$messageSuccess('批量安装成功！');
                this.installFlag = true;
                this.$router.push({ path: '/main/Zoningmanagement' });
              } else {
                this.$messageError(data.message || '批量安装失败！');
                this.installFlag = true;
              }
            })
            .catch(err => {
              this.$messageError(err.message || '批量安装失败！');
              this.installFlag = true;
            });
        } else {
          // 单个模式
          let flag = this.dataChecked();
          if (flag) {
            this.installFlag = true;
            return;
          }
          this.$api.partinstall
            .partInstall({
              type: this.typeindex, // 分区类型
              dataFormat: this.webSet.datatype, // web通讯中数据格式
              dbInfo: {
                type: this.baseSql.type,
                ip: this.baseSql.ip,
                port:
                  this.baseSql.port === '' ? 0 : parseFloat(this.baseSql.port),
                user: this.baseSql.user,
                pwd: this.baseSql.pwd,
                sql: this.baseSql.sql,
                dbName: this.baseSql.dbName
              }, // 数据库配置对象
              isChangeInTime: this.partChecked, // 是否在指定时间更改分区名称
              useName: this.changeName, // 更改名称
              changeDate: this.changeTime, // 更改时间
              name: this.partName, // 分区名称
              notice: this.notice, // 分区公告
              // noticeState: true, // 默认参数    *页面无对应*
              scriptPath:
                this.typeindex === 4 || this.typeindex === 5
                  ? ''
                  : this.installPath, // 安装路径
              machineCode: this.serverIp, // 服务器ip
              // serverPort: 0, // 服务器端口 *页面无对应*
              // sort: 0, // 默认参数    *页面无对应*
              // state: true, // 默认参数    *页面无对应*
              successMark: this.webSet.successmark, // web通讯中成功标识
              useDate: this.setTime, // 定时开区
              // uuid: '', // 默认参数    *页面无对应*
              webUrl: this.webSet.address, // web通讯中服务地址
              ybEgg: this.glodEgg, // 是否开启元宝蛋
              scan: this.glodScan, // 是否开启扫码充值
              // applicationUserId: 0, // 默认参数    *页面无对应*
              templateId: this.installModel, // 模板编号
              groups: this.teamdata.teamlist.map((item) => {
                return { id: item };
              }),
              partitionCmdType: this.iscreatjb // 是否创建脚本
            })
            .then((data) => {
              if (data.status === 200) {
                this.dataInit();
                this.$messageSuccess('安装成功！');
                this.installFlag = true;
                this.$router.push({ path: '/main/Zoningmanagement' });
              }
            })
            .catch((err) => {
              this.$messageError(err.message);
              this.installFlag = true;
            });
        }
      }
    },
    // 安装成功后，页面数据初始化
    dataInit() {
      this.typeindex = 1; // 分区类型
      this.partName = ''; // 分区名称
      this.partChecked = false; // 在指定时间更改分区名称
      this.changeName = ''; // 更改名称
      this.changeTime = this.getNewTime(); // 更改时间
      // 分组
      this.teamdata.teamAll = false;
      this.teamdata.teamlist = [];
      this.teamdata.isIndeterminate = true;

      this.serverIp = ''; // 服务器IP EMKEMEMM333336KCM32M19K2
      // this.serverPort = 6379; // 通讯端口
      this.installPath = 'D:\\MirServer'; // 安装路径
      this.installModel = ''; // 模板
      this.glodEgg = false; // 元宝蛋
      this.glodScan = 2; // 扫码充值
      this.notice = ''; // 分区公告
      // sql通用
      this.baseSql.type = 4; // 类型
      this.baseSql.ip = ''; // ip
      this.baseSql.port = ''; // 端口
      this.baseSql.user = ''; // 用户名
      this.baseSql.pwd = ''; // 用户名
      this.baseSql.sql = ''; // SQL
      // web通讯
      this.webSet.address = ''; // 接收地址
      this.webSet.successmark = ''; // 成功标识
      this.webSet.datatype = ''; // 数据格式
      this.setTime = this.getNewTime(); // 定时开区
      this.iscreatjb = 2; // 创建脚本
    },
    // 分组多选的设置函数
    teamAllChange(val) {
      this.teamdata.teamlist = val
        ? this.teamdata.Options.map((item) => item.id)
        : [];
      this.teamdata.isIndeterminate = false;
    },
    teamchange(value) {
      let checkedCount = value.length;
      this.teamdata.teamAll = checkedCount === this.teamdata.Options.length;
      this.teamdata.isIndeterminate =
        checkedCount > 0 && checkedCount < this.teamdata.Options.length;
    },
    // 获取服务器机器码下拉
    getequipcode() {
      this.$api.partinstall
        .getMachineCode()
        .then((data) => {
          if (data.status === 200) {
            this.serverDrow = data.data;
          } else if (data.status === 204) {
            this.serverDrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 删除机器码
    delequipcode(data) {
      this.$api.partinstall
        .delMachineCode([data])
        .then((data) => {
          if ((this.serverIp = data)) {
            this.serverIp = '';
          }
          this.getequipcode();
          this.$messageSuccess('删除成功！');
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    addBatch() {
      this.batchList.push({ name: '', path: 'D:\\MirServer' });
    },
    removeBatch(idx) {
      this.batchList.splice(idx, 1);
    },
    isbatchAdd() {
      if (!this.batchAdd) {
        this.partChecked = false;
        this.changeName = '';
        this.changeTime = this.getNewTime();
      }
    }
  },
  created() {
    this.groupsdrow();
    this.modelDrowList();
    this.getequipcode();
  }

};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.tip_red {
  color: red;
  padding: 10px 40px;
}

.areaContainer {
  li {
    position: relative;
    float: left;
    border: 2px solid transparent;
    padding: 2px;
    cursor: pointer;
    margin-right: 8px;

    &:hover {
      border-color: #00b066;
    }

    &.on {
      border-color: #00b066;

      &:after {
        content: "";
        position: absolute;
        width: 16px;
        height: 17px;
        background: url(../assets/images/checked.png) no-repeat center center;
        bottom: 0;
        right: 0;
      }
    }

    img {
      display: block;
    }
  }
}

.gs_textarea {
  &::v-deep .el-textarea {
    .el-textarea__inner {
      width: 400px;
      height: 100px;
    }
  }
}

.gs_textarea1 {
  &::v-deep .el-textarea {
    .el-textarea__inner {
      width: 480px;
      height: 100px;
    }
  }
}

.sqlsetbox {
  li {
    margin-bottom: 10px;

    .tit {
      float: left;
      text-align: right;
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      width: 55px;
      margin-right: 10px;
      color: #22aaf1;

      &.bigwidth {
        width: 65px;
      }
    }

    .cont {
      float: left;
    }
  }
}

.gs_checkbox {
  &::v-deep .el-checkbox {
    margin-bottom: 10px;
  }
}
</style>
