<!--
 * @Description: 模板的克隆
 * @Author: gao shuai
 * @Date: 2020-03-04 16:21:57
 * @LastEditTime: 2020-09-29 08:47:08
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="gs_title" style="color: white;">模板克隆</div>
    <!-- 基本信息 -->
    <div class="bg_fff mgt10">
      <div class="gs_title cursor bg_eee" @click="collspa.show1 = !collspa.show1">基本信息<span class="arrow"
          :class="{ 'active': collspa.show1 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show1" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>模板类型：</dt>
            <dd>
              <ul class="areaContainer clearfix">
                <li class="on" v-if="baseInfo.type === 1">
                  <img src="../assets/images/index.png" alt="">
                </li>
                <li class="on" v-else-if="baseInfo.type === 2">
                  <img src="../assets/images/cs.png" alt="">
                </li>
                <li class="on" v-else-if="baseInfo.type === 3">
                  <img src="../assets/images/cq3.png" alt="">
                </li>
                <li class="on" v-else-if="baseInfo.type === 4">
                  <img src="../assets/images/sql.png" alt="">
                </li>
              </ul>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>模板名称：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseName" v-model="baseInfo.name"></el-input>
              </span>
              <span class="line_tip">1-16个字，请勿输入特殊符号</span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>风控金额：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseName" v-model="baseInfo.safetyMoney"></el-input>
              </span>
              <span class="line_tip">额外赠送金额，请输入数字，0为不赠送</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 4">
            <dt>游戏名称：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseGameMing" v-model="baseInfo.gameMing"></el-input>
              </span>
              <span class="line_tip">1-16个字，请勿输入特殊符号</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 1 || baseInfo.type === 2">
            <dt>游戏币：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="baseInfo.gameMoney" @change="gameMoneyChange">
                  <el-radio :label="0">元宝</el-radio>
                  <el-radio :label="1">金币</el-radio>
                  <el-radio :label="3" v-if="baseInfo.type === 2">金元</el-radio>
                  <el-radio :label="2">自定义</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>游戏中展示：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="baseInfo.isShowGlod">
                  <el-radio :label="0">完全显示</el-radio>
                  <el-radio :label="1">部分显示</el-radio>
                  <el-radio :label="2">不显示</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 3 || baseInfo.type === 4 || baseInfo.type === 5">
            <dt>充值方式：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-input size="small" ref="baseChargetype" v-model="baseInfo.chargetype"></el-input>
              </span>
              <span class="block_tip">设置按 游戏账号 或 游戏角色充值，默认按 游戏账号 充值</span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>游戏币名称：</dt>
            <dd>
              <span class="inputbox inputColorBox">
                <el-input size="small" :class="'inputColor' + baseInfo.color" ref="baseGameName"
                  v-model="baseInfo.gameName"></el-input>
              </span>
            </dd>
            <dd class="colorBox">
              <ul class="clearfix">
                <li class="color0" :class="{ 'on': baseInfo.color === 0 }" @click="baseInfo.color = 0"></li>
                <li class="color1" :class="{ 'on': baseInfo.color === 1 }" @click="baseInfo.color = 1"></li>
                <li class="color3" :class="{ 'on': baseInfo.color === 3 }" @click="baseInfo.color = 3"></li>
                <li class="color2" :class="{ 'on': baseInfo.color === 2 }" @click="baseInfo.color = 2"></li>
                <li class="color4" :class="{ 'on': baseInfo.color === 4 }" @click="baseInfo.color = 4"></li>
                <li class="color5" :class="{ 'on': baseInfo.color === 5 }" @click="baseInfo.color = 5"></li>
              </ul>
            </dd>
            <dt v-if="baseInfo.type === 1 || baseInfo.type === 2">脚本命令：</dt>
            <dd v-if="baseInfo.type === 1 || baseInfo.type === 2">
              <span class="inputbox">
                <el-input size="small" ref="baseCommand" v-model="baseInfo.command"></el-input>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>兑换比例：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseRate" type="number" v-model="baseInfo.rate"></el-input>
              </span>
              <span class="line_tip">1元人民币可以兑换的游戏币数量</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 1 || baseInfo.type === 2">
            <dt>充值N P C：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox">
                  <table>
                    <thead>
                      <tr>
                        <th width="230">NPC名称</th>
                        <th width="110">地图</th>
                        <th width="110">外观</th>
                        <th width="110">X坐标</th>
                        <th width="110">y坐标</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in baseInfo.chargeNpc" :key="'charge' + i">
                        <td>
                          <el-input size="small" :ref="'baseChargeName' + i" v-model="item.name"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'baseChargeMap' + i" v-model="item.map"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'baseChargeLooks' + i" v-model="item.looks"
                            type="number"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'baseChargexAxis' + i" v-model="item.xAxis"
                            type="number"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'baseChargeyAxis' + i" v-model="item.yAxis"
                            type="number"></el-input>
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delchargeNpc(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addchargeNpc">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 1 || baseInfo.type === 2">
            <dt>游戏引擎：</dt>
            <dd>
              <span class="inputbox">
                <el-select size="small" popper-class="custom-select" v-model="baseInfo.gameEngine" ref="baseGameEngine" placeholder="请选择" @change="gameEngineChange">
                  <el-option v-for="(item,i) in gameEnginedrow" :key="'yq'+i" :label="item.engine" :value="item.engine">
                  </el-option>
                </el-select>
              </span>
              <span class="block_tip">其它游戏引擎请联系平台管理员进行添加</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.type === 1 || baseInfo.type === 2">
            <dt>浏览器指令：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseWebCommand" v-model="baseInfo.webCommand"></el-input>
              </span>
              <span class="block_tip">不同的引擎打开浏览器的指令可能有差异，请查阅相关帮助文档</span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>扫码支付：</dt>
            <dd>
              <span class="inputbox">
                <el-checkbox v-model="baseInfo.isScan">开启游戏内扫码支付</el-checkbox>
              </span>
              <span class="line_tip">开启后玩家可以直接在游戏内扫码支付</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isScan">
            <dt>模 板：</dt>
            <dd>
              <span class="inputbox">
                <el-select style="width:250px;" size="small" ref="scanModel" v-model="scanModel" placeholder="请选择">
                  <el-option v-for="(item) in scanModelDrow" :key="item.id" :label="item.title" :value="item.id">
                  </el-option>
                </el-select>
                <el-button style="margin-left: 15px;" size="small" type="primary" @click="openQrcodeDialog(false)">创建二维码模版</el-button>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>微信密保：</dt>
            <dd>
              <span class="inputbox">
                <el-checkbox v-model="baseInfo.isWxmb">开启微信密保功能</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isWxmb">
            <dt>模 板：</dt>
            <dd>
              <span class="inputbox">
                <el-select style="width:250px;" size="small" ref="installModel" v-model="installModel"
                  placeholder="请选择">
                  <el-option v-for="(item) in modelDrow" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-button style="margin-left: 15px;" size="small" type="primary" @click="openWxmbDialog(false, null, '热血传奇')">创建微信密保模版</el-button>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" style="display: none;">
            <dt>最小金额：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseMinMoney" type="number" v-model="baseInfo.minMoney"></el-input>
              </span>
              <span class="line_tip">单笔订单允许最小充值金额{{ baseInfo.sysMinMoney }}</span>
            </dd>
          </dl>
          <dl class="clearfix" style="display: none;">
            <dt>最大金额：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseMaxMoney" type="number" v-model="baseInfo.maxMoney"></el-input>
              </span>
              <span class="line_tip">单笔订单允许最大充值金额{{ baseInfo.sysMaxMoney }}</span>
            </dd>
          </dl>
          <dl class="clearfix" style="display: none;">
            <dt>固定金额：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseFixedMoney" type="text" v-model="baseInfo.fixedMoney"></el-input>
              </span>
              <span class="line_tip">固定金额以“,”隔开，例如10,20,50,100,1000</span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>通区：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="baseInfo.isTongQu" @input="onChangeRadio">
                  <el-radio :label="false">否</el-radio>
                  <el-radio :label="true">是</el-radio>
                </el-radio-group>
                <span class="line_tip">注意:通区同注册账号会出现相互领取,重复加载可能导致正在充值掉单情况</span>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isTongQu">
            <dt>目录类别：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="baseInfo.isDir" @input="onChangeDir">
                  <el-radio :label="0">同盘符</el-radio>
                  <el-radio :label="1">不同盘符</el-radio>
                </el-radio-group>
                <span class="line_tip" style="color: red;font-weight: bold;">通区目录与游戏引擎是否在同一个盘符上！</span>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isTongQu">
            <dt>有测试区：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="baseInfo.isTest">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isTongQu && baseInfo.isTest">
            <dt>额外补发：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" ref="baseGameMing" v-model="baseInfo.betch"></el-input>
              </span>
              <span class="line_tip">%</span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isTongQu && baseInfo.isTest">
            <dt>补发选项：</dt>
            <dd>
              <span class="inputbox">
                <el-checkbox v-model="baseInfo.isBetch">额外补发只补发主货币</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="baseInfo.isTongQu">
            <dt>通区目录：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" @input="onChangeTongQuDir" ref="baseFixedMoney" type="text"
                  v-model="baseInfo.tongQuDir"></el-input>
              </span>
              <span class="line_tip">通区目录</span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>充值脚本路径：</dt>
            <dd>
              <span class="inputbox">
                <el-input size="small" @input="onChangeValue" ref="baseFixedMoney" type="text"
                  v-model="baseInfo.payDir"></el-input>
              </span>
              <span class="line_tip" style="color: red;font-weight: bold;">平台充值脚本存放的文件夹名称，一个区配置双NPC时，该名称需不同</span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 附加赠送 -->
    <div class="bg_fff mgt5" v-if="baseInfo.type === 1 || baseInfo.type === 2">
      <div class="gs_title cursor bg_eee" @click="collspa.show3 = !collspa.show3">附加赠送<span class="arrow"
          :class="{ 'active': collspa.show3 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show3" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>充值显示：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="attachInfo.checked">显示附加赠送信息</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>附加详情：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 800px;">
                  <table>
                    <thead>
                      <tr>
                        <th width="130">附加奖励</th>
                        <!-- <th width="50"></th> -->
                        <th width="180">脚本命令</th>
                        <th width="100">赠送比例</th>
                        <th width="180">赠送方式</th>
                        <th width="70">网站显示</th>
                        <th width="120">游戏显示</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in attachInfo.attachList" :key="'attach' + i">
                        <td>
                          <el-input size="small" :ref="'attachName' + i" v-model="item.name"></el-input>
                        </td>

                        <td>
                          <el-input size="small" :ref="'attachCommand' + i" v-model="item.command"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'attachRatio' + i" v-model="item.ratio" type="number"></el-input>
                        </td>
                        <td>
                          <el-select size="small" v-model="item.type" placeholder="请选择" style="width:235px;">
                            <el-option v-for="(item, i) in attachInfo.options" :key="'yq' + i" :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </td>
                        <td class="tc">
                          <el-checkbox v-model="item.isShow">网站</el-checkbox>
                        </td>
                        <td class="tc">
                          <el-select v-model="item.show" size="small" placeholder="请选择" style="width: 110px;">
                            <el-option label="显示" :value="0"></el-option>
                            <el-option label="部分显示" :value="1"></el-option>
                            <el-option label="不显示" :value="2"></el-option>
                          </el-select>
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delAttach(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addAttach">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 激励赠送 -->
    <div class="bg_fff mgt5">
      <div class="gs_title cursor bg_eee" @click="collspa.show2 = !collspa.show2">激励赠送<span class="arrow"
          :class="{ 'active': collspa.show2 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show2" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>设置：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="inciteInfo.checked">开启激励赠送</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group @input="onChangeRadio" v-model="baseInfo.giveOptionState">
                  <el-radio :label="0">按充值金额计算</el-radio>
                  <el-radio :label="1">充值金额+渠道赠送</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>赠送详情：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 550px;">
                  <table>
                    <tbody>
                      <tr v-for="(item, i) in inciteInfo.giveList" :key="'incite' + i">
                        <td>
                          <span class="mgr5 basecolor">满：</span>
                          <el-input style="display:inline-block;width: 150px;" :ref="'inciteAmount' + i" size="small"
                            type="number" :disabled="!inciteInfo.checked" v-model="item.amount"></el-input> 元
                        </td>
                        <td>
                          <span class="mgr5 basecolor">赠送：</span>
                          <el-input style="display:inline-block;width: 150px;" :ref="'inciteGiveAmount' + i" size="small"
                            type="number" :disabled="!inciteInfo.checked" v-model="item.giveAmount"></el-input> 元
                        </td>
                        <td>
                          <el-button size="small" type="danger" :disabled="!inciteInfo.checked"
                            @click="delIncite(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" :disabled="!inciteInfo.checked"
                      @click="addIncite">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 积分赠送 -->
    <div class="bg_fff mgt5" v-if="baseInfo.type === 1 || baseInfo.type === 2">
      <div class="gs_title cursor bg_eee" @click="collspa.show4 = !collspa.show4">积分赠送<span class="arrow"
          :class="{ 'active': collspa.show4 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show4" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>充值显示：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="integralInfo.checked">显示积分赠送信息</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>积分详情：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 930px;">
                  <table>
                    <thead>
                      <tr>
                        <th width="130">附加奖励</th>
                        <th width="150">文件路径</th>
                        <th width="100">赠送比例</th>
                        <th width="180">赠送方式</th>
                        <th width="70">网站显示</th>
                        <th width="120">游戏显示</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in integralInfo.integralList" :key="'integral' + i">
                        <td>
                          <el-input size="small" style="width:90px;" :ref="'integralName' + i"
                            @input="onChangeIntegralName(i)" v-model="item.name"></el-input>
                        </td>
                        <td>
                          <el-input :disabled="true" size="small" style="width:250px;" :ref="'integralFile' + i"
                            v-model="item.file"></el-input>
                        </td>
                        <td>
                          <el-input size="small" type="number" :ref="'integralRatio' + i" v-model="item.ratio"></el-input>
                        </td>
                        <td>
                          <el-select size="small" v-model="item.type" placeholder="请选择" style="width:185px;">
                            <el-option v-for="(li, i) in attachInfo.options" :key="'yq' + i" :label="li.label"
                              :value="li.value">
                            </el-option>
                          </el-select>
                        </td>
                        <td class="tc">
                          <el-checkbox v-model="item.isShow">网站</el-checkbox>
                        </td>
                        <td class="tc">
                          <el-select v-model="item.show" size="small" placeholder="请选择" style="width: 110px;">
                            <el-option label="显示" :value="0"></el-option>
                            <el-option label="部分显示" :value="1"></el-option>
                            <el-option label="不显示" :value="2"></el-option>
                          </el-select>
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delIntegral(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addIntegral">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 装备赠送 -->
    <div class="bg_fff mgt5" v-if="baseInfo.type === 1 || baseInfo.type === 2">
      <div class="gs_title cursor bg_eee" @click="collspa.show5 = !collspa.show5">装备赠送<span class="arrow"
          :class="{ 'active': collspa.show5 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show5" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>显示选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="equipmentInfo.isChecked">游戏显示</el-checkbox>
                <el-checkbox v-model="equipmentInfo.checked">网站显示</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>计算选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="equipmentInfo.giveType">
                  <el-radio :label="0">关闭赠送</el-radio>
                  <el-radio :label="1">按充值金额赠送</el-radio>
                  <el-radio :label="2">充值金额 + 渠道赠送</el-radio>
                  <el-radio :label="3">充值金额 + 激励赠送</el-radio>
                  <el-radio :label="4">充值金额 + 激励赠送 + 渠道赠送</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>赠送选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="equipmentInfo.giveOption">
                  <el-radio :label="0">只送最大金额</el-radio>
                  <el-radio :label="1">送所有符合的金额</el-radio>
                </el-radio-group>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>装备详情：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 700px;">
                  <table>
                    <thead>
                      <tr>
                        <th width="40"></th>
                        <th width="130">金额（元）</th>
                        <th width="180">脚本命令</th>
                        <th width="200">赠送装备</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in equipmentInfo.list" :key="'equip' + i">
                        <td style="color: #63aafa;">满：</td>
                        <td>
                          <el-input size="small" type="number" :ref="'equipmentAmount' + i"
                            v-model="item.amount"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'equipmentCommand' + i" v-model="item.command"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'equipmentName' + i" v-model="item.name"></el-input>
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delequip(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p v-if="equipmentInfo.list.length > 0"
                    style="margin-left:10px;margin-top:10px;color:red;font-size:13px;">
                    !温馨提示:如需赠送多个装备,装备之间请用"+"分隔.例如:回城券*5+传送戒指 (注：*后为赠送数量,默认值为1)</p>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addequip">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 红包赠送 -->
    <div class="bg_fff mgt5" v-if="baseInfo.type === 1 || baseInfo.type === 2">
      <div class="gs_title cursor bg_eee" @click="collspa.show6 = !collspa.show6">红包赠送<span class="arrow"
          :class="{ 'active': collspa.show6 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show6" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>设置：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="redbag.checked">开启红包赠送</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="redbag.redPacketAdditional">开启附加赠送</el-checkbox>
                <el-checkbox v-model="redbag.redPacketIntegral">开启积分赠送</el-checkbox>
                <el-checkbox v-model="redbag.redPacketEquip">开启装备赠送</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>红包N P C：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 700px;">
                  <table>
                    <thead>
                      <tr>
                        <th width="230">NPC名称</th>
                        <th width="110">地图</th>
                        <th width="110">外观</th>
                        <th width="110">X坐标</th>
                        <th width="110">y坐标</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in redbag.redNPC" :key="'redbag' + i">
                        <td>
                          <el-input size="small" :ref="'redbagName' + i" v-model="item.name"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'redbagMap' + i" v-model="item.map"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'redbagLooks' + i" v-model="item.looks" type="number"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'redbagxAxis' + i" v-model="item.xAxis" type="number"></el-input>
                        </td>
                        <td>
                          <el-input size="small" :ref="'redbagyAxis' + i" v-model="item.yAxis" type="number"></el-input>
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delredNpc(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addredNpc">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>红包详情：</dt>
            <dd>
              <span class="inputbox">
                <div class="tablebox" style="width: 700px;">
                  <table>
                    <tbody>
                      <tr v-for="(item, i) in redbag.redDetail" :key="'red' + i">
                        <td>
                          <span class="mgr5 basecolor">满：</span>
                          <el-input style="display:inline-block;width: 150px;" type="number" :ref="'redbagAmount' + i"
                            size="small" v-model="item.amount"></el-input> 元
                        </td>
                        <td>
                          <span class="mgr5 basecolor">随机赠送：</span>
                          <el-input style="display:inline-block;width: 70px;" type="number" :ref="'redbagStartAmount' + i"
                            size="small" v-model="item.startAmount"></el-input> --
                          <el-input style="display:inline-block;width: 70px;" type="number" :ref="'redbagEndAmount' + i"
                            size="small" v-model="item.endAmount"></el-input> 元
                        </td>
                        <td>
                          <el-button size="small" type="danger" @click="delred(i)">删除</el-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="pdl10 mgt5">
                    <el-button size="small" type="primary" @click="addred">添加</el-button>
                  </p>
                </div>
              </span>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 充值渠道 -->
    <div class="bg_fff mgt5">
      <div class="gs_title cursor bg_eee" @click="collspa.show7 = !collspa.show7">渠道赠送<span class="arrow"
          :class="{ 'active': collspa.show7 }"></span></div>
      <el-collapse-transition>
        <div v-show="collspa.show7" class="gs_listcontainer">
          <dl class="clearfix">
            <dt>设置：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-checkbox v-model="chargeInfo.checked">开启充值渠道赠送</el-checkbox>
              </span>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>选项：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-radio-group v-model="chargeInfo.select">
                  <el-radio :label="0">按固定比例赠送</el-radio>
                  <el-radio :label="1">按充值金额赠送</el-radio>
                </el-radio-group>
              </span>
            </dd>
            <dt>一键设置：</dt>
            <dd>
              <span class="inputbox pdt5">
                <el-switch v-model="chargeInfo.oneSet"></el-switch>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-if="chargeInfo.select === 0">
            <dt></dt>
            <dd>
              <span class="inputbox">
                <ul class="chargelist">
                  <li class="clearfix" v-for="(item, i) in chargeInfo.redNPC" :key="'charge' + i">
                    <span class="tit">{{ item.productName }} :</span>
                    <span class="inp">
                      <el-input size="small" type="number" :ref="'chargeRate' + i" v-model="item.rate"
                        @input="fixedInp(item.rate)"></el-input>
                    </span>
                    <span style="height:32px;line-height:32px;margin-left: 5px;">%</span>
                  </li>
                </ul>
              </span>
            </dd>
          </dl>
          <dl class="clearfix" v-else>
            <dd>
              <div class="accountList clearfix" v-for="(item, i) in chargeInfo.redNPC" :key="'money' + i">
                <span class="tit">{{ item.productName }} :</span>
                <div class="listbox">
                  <table>
                    <tr>
                      <td :class="{ 'firstd': k === 0 }" v-for="(li, k) in item.amountRate" :key="'rate' + k">
                        <p>{{ k === 0 ? '不足' : '满' }}<el-input class="inp" size="small" type="number"
                            :ref="'charge' + i + 'amount' + k" v-model="li.amount" @input="moneyInp(k, li.amount)"></el-input>元
                        </p>
                        <p class="mgt5">
                          <el-input class="inp secondinp" size="small" type="number" :ref="'charge' + i + 'rate' + k"
                            v-model="li.rate" @input="rateInp(k, li.rate)"></el-input>%
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="btnbox">
                  <el-button size="mini" type="danger" @click="deleteItem(i)">删除</el-button>
                  <el-button style="margin-left:0;margin-top:5px;" size="mini" type="primary"
                    @click="addItem(i)">添加</el-button>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </el-collapse-transition>
    </div>
    <p class="tc mgt15">
      <el-button type="primary" @click="submit" :loading="!editFlag">保存</el-button>
    </p>
    <!-- 新增/编辑二维码模版弹窗 -->
    <el-dialog :title="qrcodeDialog.isEdit ? '编辑二维码模版' : '新增二维码模版'" :visible.sync="qrcodeDialog.visible" width="480px"
      :close-on-click-modal="false" @close="closeQrcodeDialog">
      <el-form ref="qrcodeForm" :model="qrcodeDialog.form" :rules="qrcodeDialog.rules" label-width="80px" size="small"
        style="padding-right:12px;" @submit.native.prevent="saveQrcodeTemplate">
        <el-form-item label="标题" prop="title">
          <el-input v-model="qrcodeDialog.form.title" placeholder="请输入标题" maxlength="30" />
        </el-form-item>
        <el-form-item label="Wii编号" prop="resourceCode">
          <el-input v-model="qrcodeDialog.form.resourceCode" placeholder="请输入WII编号" maxlength="20" />
        </el-form-item>
        <el-form-item label="图片序号" prop="imageCode">
          <el-input v-model="qrcodeDialog.form.imageCode" placeholder="请输入图片序号" maxlength="20" />
        </el-form-item>
        <el-form-item label="尺寸" prop="serial">
          <el-select v-model="qrcodeDialog.form.serial" placeholder="请选择" style="width:100%;">
            <el-option v-for="n in [3, 4, 5, 6]" :key="n" :label="n" :value="n" />
          </el-select>
        </el-form-item>
        <el-form-item label="坐标X" prop="xOffset">
          <el-input v-model="qrcodeDialog.form.xOffset" placeholder="请输入坐标X" maxlength="10" />
        </el-form-item>
        <el-form-item label="坐标Y" prop="yOffset">
          <el-input v-model="qrcodeDialog.form.yOffset" placeholder="请输入坐标Y" maxlength="10" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeQrcodeDialog">取消</el-button>
        <el-button type="danger" :loading="qrcodeDialog.loading" @click="saveQrcodeTemplate">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增/编辑微信密保模版弹窗 -->
    <el-dialog :title="wxmbDialog.isEdit ? '编辑微信密保模版' : '新增微信密保模版'" :visible.sync="wxmbDialog.visible" width="900px"
      :close-on-click-modal="false" @close="closeWxmbDialog">
      <div class="wxmb-dialog-scroll">
        <el-form ref="wxmbForm" :model="wxmbDialog.form" :rules="wxmbDialog.rules" label-width="160px" size="small"
          style="padding-right:12px;" @submit.native.prevent="saveWxmbTemplate">
          <!-- 这里粘贴你在 wechat.vue 里用的微信密保模版表单内容即可 -->
          <!-- 基本信息 -->
          <!-- 基本信息 -->
          <el-form-item label="模版名称" prop="name">
            <el-input v-model="wxmbDialog.form.name" maxlength="30" />
          </el-form-item>
          <el-form-item label="二维码模版" prop="qrcodeType" style="margin-top:18px;">
            <el-select v-model="wxmbDialog.form.qrcodeType" placeholder="请选择二维码模版">
              <!-- <el-option label="BLUE密保" value="BLUE密保"/>
                <el-option label="GOM/GEE密保" value="GOM/GEE密保"/> -->
              <el-option v-for="(item, i) in qrcodeTemplatesList" :key="i" :label="item.title"
                :value="item.title"></el-option>
            </el-select>
          </el-form-item>
          <!-- 传奇世界专属：补丁下载 -->
          <el-form-item v-if="wxmbDialog.form.gameType === '传奇世界'" label="补丁下载" prop="patchType">
            <div class="qrcode-tags">
              <el-tag style="margin-left:8px;cursor: pointer;font-size: 14px;"><a
                  href="http://localhost:5003/script/七星服务Gom.zip"><i class="el-icon-paperclip"></i>4x4</a></el-tag>
              <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a
                  href="http://localhost:5003/script/七星服务Gee.zip" target="_blank"><i
                    class="el-icon-paperclip"></i>8x8</a></el-tag>
            </div>
          </el-form-item>
          <el-divider content-position="left">微信密保</el-divider>
          <el-form-item label="是否进行强制验证" prop="isForce">
            <el-radio-group v-model="wxmbDialog.form.isForce">
              <el-radio :label="true">强制验证</el-radio>
              <el-radio :label="false">不强制验证</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="验证密保地图ID" prop="mbMapId">
            <el-input v-model="wxmbDialog.form.mbMapId" />
          </el-form-item>
          <el-form-item label="验证完成传送地图ID" prop="finishMapId" style="margin-top:18px;">
            <el-input v-model="wxmbDialog.form.finishMapId" />
          </el-form-item>
          <!-- 热血传奇专属：密保变量定义 -->
          <template v-if="wxmbDialog.form.gameType !== '传奇世界'">
            <el-divider content-position="left">密保变量定义</el-divider>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="机器码" prop="machineVar">
                  <el-input v-model="wxmbDialog.form.machineVar" placeholder="如：T46" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信openid" prop="openidVar">
                  <el-input v-model="wxmbDialog.form.openidVar" placeholder="如：T47" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信保留ID" prop="wxVar">
                  <el-input v-model="wxmbDialog.form.wxVar" placeholder="如：T48" />
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <el-divider content-position="left">密保NPC</el-divider>
          <el-form-item label="NPC名称" prop="npcName">
            <el-input v-model="wxmbDialog.form.npcName" placeholder="如：游戏密保认证" />
          </el-form-item>
          <el-form-item style="margin-top:18px;">
            <el-row :gutter="10">
              <el-col :span="6"><strong>地图ID</strong></el-col>
              <el-col :span="4"><strong>x坐标</strong></el-col>
              <el-col :span="4"><strong>y坐标</strong></el-col>
              <el-col :span="6"><strong>外观ID</strong></el-col>
              <el-col :span="4"><strong>操作</strong></el-col>
            </el-row>
            <div v-for="(npc, idx) in wxmbDialog.form.npcs" :key="idx" style="margin-bottom:8px;">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-input v-model="npc.mapId" placeholder="地图ID" />
                </el-col>
                <el-col :span="4">
                  <el-input v-model="npc.x" placeholder="x坐标" />
                </el-col>
                <el-col :span="4">
                  <el-input v-model="npc.y" placeholder="y坐标" />
                </el-col>
                <el-col :span="6">
                  <el-input v-model="npc.lookId" placeholder="外观ID" />
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" size="mini" @click="removeNpc(idx)">删除</el-button>
                </el-col>
              </el-row>
            </div>
            <el-button type="text" @click="addNpc">+ 添加一行</el-button>
          </el-form-item>
          <el-divider content-position="left">游戏转区</el-divider>
          <el-form-item>
            <el-checkbox v-model="wxmbDialog.form.transferEnable">开启转区功能</el-checkbox>
          </el-form-item>
          <template v-if="wxmbDialog.form.transferEnable">
            <el-form-item label="可转区最低金额" prop="transferMinAmount">
              <el-input v-model="wxmbDialog.form.transferMinAmount" placeholder="请输入最低金额" style="width: 200px;">
                <template slot="append">元</template>
              </el-input>
              <span class="line_tip">玩家最低要充多少钱才可进行转区</span>
            </el-form-item>
            <!-- 热血传奇专属：转区变量定义 -->
            <template v-if="wxmbDialog.form.gameType !== '传奇世界'">
              <el-divider content-position="left">转区变量定义</el-divider>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="充值转区点" prop="transferRechargeVar">
                    <el-input v-model="wxmbDialog.form.transferRechargeVar" placeholder="如：U46" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="已用转区点" prop="transferUsedVar">
                    <el-input v-model="wxmbDialog.form.transferUsedVar" placeholder="如：U47" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="角色是否已转区" prop="transferFlagVar">
                    <el-input v-model="wxmbDialog.form.transferFlagVar" placeholder="如：U48" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="通区货币" prop="transferCoinVar">
                    <el-input v-model="wxmbDialog.form.transferCoinVar" placeholder="如：U49" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="通区货币名称" prop="transferCoinName">
                    <el-input v-model="wxmbDialog.form.transferCoinName" placeholder="如：游戏币" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <el-divider content-position="left">转区NPC</el-divider>
            <el-form-item label="NPC名称" prop="transferNpcName">
              <el-input v-model="wxmbDialog.form.transferNpcName" placeholder="如：自助转区服务" />
            </el-form-item>
            <el-form-item style="margin-top:18px;">
              <el-row :gutter="10">
                <el-col :span="6"><strong>地图ID</strong></el-col>
                <el-col :span="4"><strong>x坐标</strong></el-col>
                <el-col :span="4"><strong>y坐标</strong></el-col>
                <el-col :span="6"><strong>外观ID</strong></el-col>
                <el-col :span="4"><strong>操作</strong></el-col>
              </el-row>
              <div v-for="(npc, idx) in wxmbDialog.form.transferNpcs" :key="idx" style="margin-bottom:8px;">
                <el-row :gutter="10">
                  <el-col :span="6">
                    <el-input v-model="npc.mapId" placeholder="地图ID" />
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="npc.x" placeholder="x坐标" />
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="npc.y" placeholder="y坐标" />
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="npc.lookId" placeholder="外观ID" />
                  </el-col>
                  <el-col :span="4">
                    <el-button type="danger" size="mini" @click="removeTransferNpc(idx)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
              <el-button type="text" @click="addTransferNpc">+ 添加一行</el-button>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeWxmbDialog">取消</el-button>
        <el-button type="danger" :loading="wxmbDialog.loading" @click="saveWxmbTemplate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { gameEngine, gameEngine1 } from '../assets/js/version';
export default {
  data() {
    return {
      editFlag: true, // 编辑请求flag防呆
      collspa: {
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false
      },
      modelDrow: [], // 微信密保模版下拉
      scanModelDrow: [], // 扫码支付模版下拉
      scanModel: '', // 扫码模版
      installModel: '', // 微信密保模版
      qrcodeTemplatesList: [], // 获取二维码模版，不分页
      baseInfo: {
        // 基本信息
        type: 1, // 模板类型
        name: '', // 模板名称
        gameMing: '', // 游戏名称
        gameMoney: 0, // 游戏币
        chargetype: '', // 充值方式
        gameName: '', // 游戏币名称
        color: 0, // 游戏币颜色
        command: '', // 脚本命令
        rate: '', // 兑换比例
        chargeNpc: [], // 充值NPC
        gameEngine: '', // 游戏引擎
        gameEnginelist: [], // 游戏引擎下拉
        // gameEnginedrow: gameEngine, // 游戏引擎下拉
        isShowGlod: 0, // 是否显示游戏币
        webCommand: '', // 浏览器指令
        minMoney: '', // 最小金额
        maxMoney: '', // 最大金额
        fixedMoney: '', // 固定
        isTongQu: false, // 是否通区
        tongQuDir: '', // 通区目录
        payDir: '', // 充值脚本路径
        dir: [], // 充值脚本路径盘符
        DirType: false, // 领取路径
        sysMinMoney: 0, // 系统最小金额
        sysMaxMoney: 0, // 系统最大金额
        isDir: 0, // 目录类别   0同盘符  1不同盘符
        giveOptionState: 0, // 计算选项  0按充值金额计算  1充值金额+渠道赠送
        safetyMoney: 0, // 安全金额
        isTest: true, // 是否测试服
        betch: 1, // 补发比例
        isBetch: false // 是否开启额外补发
      },
      inciteInfo: {
        // 激励详情
        checked: false, // 设置
        giveList: [] // 赠送详情
      },
      attachInfo: {
        // 附加赠送
        checked: false, // 充值显示
        attachList: [], // 附加详情
        options: [
          {
            value: 0,
            label: '关闭赠送'
          },
          {
            value: 1,
            label: '按充值金额赠送'
          },
          {
            value: 2,
            label: '充值金额 + 渠道赠送'
          },
          {
            value: 3,
            label: '充值金额 + 激励赠送'
          },
          {
            value: 4,
            label: '充值金额 + 激励赠送 + 渠道赠送'
          }
        ]
      },
      integralInfo: {
        // 积分赠送
        checked: false, // 充值显示
        integralList: [] // 积分详情
      },
      equipmentInfo: {
        // 装备赠送
        checked: false, // 充值显示
        isChecked: false, // 游戏显示
        giveType: 0, // 计算选项
        giveOption: 0, // 赠送选项
        list: [] // 装备详情
      },
      redbag: {
        // 红包赠送
        checked: false, // 设置
        redPacketAdditional: false, // 开启附加赠送
        redPacketIntegral: false, // 开启积分赠送
        redPacketEquip: false, // 开启装备赠送
        redNPC: [], // 红包NPC
        redDetail: [] // 红包详情
      },
      chargeInfo: {
        // 充值渠道
        checked: true, // 设置
        select: 0, // 选项
        oneSet: false, // 一键设置
        redNPC: [] // 赠送详情
      },
      dialog: {
        show: false,
        checked: 1,
        id: '',
        ids: [] // 新增
      },
      qrcodeDialog: {
        visible: false,
        isEdit: false,
        loading: false,
        form: {
          title: '',
          resourceCode: '',
          imageCode: '',
          serial: 3,
          xOffset: '',
          yOffset: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { max: 30, message: '标题长度不能超过30个字符' }
          ],
          resourceCode: [
            { required: true, message: '请输入WII编号', trigger: 'blur' },
            { max: 20, message: 'WII编号长度不能超过20个字符' }
          ],
          imageCode: [
            { required: true, message: '请输入图片序号', trigger: 'blur' },
            { max: 20, message: '图片序号长度不能超过20个字符' }
          ],
          serial: [
            { required: true, message: '请选择尺寸', trigger: 'change' }
          ],
          xOffset: [
            { required: true, message: '请输入坐标X', trigger: 'blur' }
          ],
          yOffset: [
            { required: true, message: '请输入坐标Y', trigger: 'blur' }
          ]
        }
      },
      wxmbDialog: {
        visible: false,
        isEdit: false,
        loading: false,
        form: {
          name: '微信密保模版',
          gameType: '传奇世界',
          qrcodeType: '',
          // patchType: '', // 传奇世界专属
          isForce: true,
          mbMapId: '3',
          finishMapId: '3',
          machineVar: 'T47',
          openidVar: 'T48',
          wxVar: 'T49',
          npcName: '密保NPC',
          npcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }],
          transferEnable: false,
          transferMinAmount: '100',
          transferRechargeVar: 'U46',
          transferUsedVar: 'U47',
          transferFlagVar: 'U48',
          transferCoinVar: 'U49',
          transferCoinName: '游戏币',
          transferNpcName: '转区NPC',
          transferNpcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }]
        },
        rules: {
          name: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
          gameType: [{ required: true, message: '请选择游戏类型', trigger: 'change' }],
          qrcodeType: [{ required: true, message: '请选择二维码模版', trigger: 'change' }],
          isForce: [{ required: true, message: '请选择是否强制', trigger: 'change' }],
          mbMapId: [{ required: true, message: '请输入验证密保地图ID', trigger: 'blur' }],
          finishMapId: [{ required: true, message: '请输入验证完成传送地图ID', trigger: 'blur' }],
          machineVar: [{ required: true, message: '请输入机器码变量', trigger: 'blur' }],
          openidVar: [{ required: true, message: '请输入微信openid变量', trigger: 'blur' }],
          wxVar: [{ required: true, message: '请输入微信保留ID变量', trigger: 'blur' }],
          npcName: [{ required: true, message: '请输入NPC名称', trigger: 'blur' }],
          transferMinAmount: [
            { required: true, message: '请输入最低金额', trigger: 'blur' }
          ],
          transferRechargeVar: [
            { required: true, message: '请输入充值转区点变量', trigger: 'blur' }
          ],
          transferUsedVar: [
            { required: true, message: '请输入已用转区点变量', trigger: 'blur' }
          ],
          transferFlagVar: [
            { required: true, message: '请输入角色是否已转区变量', trigger: 'blur' }
          ],
          transferCoinVar: [
            { required: true, message: '请输入通区货币变量', trigger: 'blur' }
          ],
          transferCoinName: [
            { required: true, message: '请输入通区货币名称', trigger: 'blur' }
          ],
          transferNpcName: [
            { required: true, message: '请输入转区NPC名称', trigger: 'blur' }
          ]
        }
      }
    };
  },
  computed: {
    gameEnginedrow() {
      if (this.baseInfo.type === 1) {
        let arr = this.baseInfo.gameEnginelist.filter((item) => {
          return item.type === 1;
        });
        return arr;
      } else if (this.baseInfo.type === 2) {
        return this.baseInfo.gameEnginelist.filter((item) => {
          return item.type === 2;
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    // 构建积分文件路径，自动处理 payDir 为空、通区与盘符差异
    buildIntegralFile(name) {
      const paySegment = this.baseInfo.payDir ? `${this.baseInfo.payDir}\\` : '';
      if (this.baseInfo.isTongQu) {
        if (this.baseInfo.isDir === 0) {
          const tong = (this.baseInfo.tongQuDir || '').replace(/^[A-Za-z]:\\/, '');
          return `..\\..\\..\\..\\${tong}\\Mir200\\Envir\\QuestDiary\\${paySegment}充值积分\\${name}Save.txt`;
        } else {
          const tong = (this.baseInfo.tongQuDir || '').replace(/\\$/, '');
          return `${tong}\\Mir200\\Envir\\QuestDiary\\${paySegment}充值积分\\${name}Save.txt`;
        }
      } else {
        return `..\\QuestDiary\\${paySegment}充值积分\\${name}Save.txt`;
      }
    },
    // 刷新所有积分文件路径（在 created 与 payDir/通区相关变化时调用）
    refreshIntegralFiles() {
      this.integralInfo.integralList.forEach(item => {
        item.file = this.buildIntegralFile(item.name || '');
      });
    },
    // 监听目录类别变化
    onChangeDir(value) {
      // const item = this.integralInfo.integralList[index];
      // var tongQuDirInfo = this.baseInfo.tongQuDir;
      // if (value === 0) {
      //   // 同盘符
      //   // 分割路径，去掉盘符
      //   tongQuDirInfo = tongQuDirInfo.replace(/^[A-Za-z]:\\/, '');
      //   this.integralInfo.integralList.forEach(item => {
      //     if (this.baseInfo.isTongQu) { item.file = `..\\..\\..\\..\\${tongQuDirInfo}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`; } else { item.file = `..\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`; }
      //   });
      // } else {
      //   // 不同盘符
      //   this.integralInfo.integralList.forEach(item => {
      //     item.file = `${this.baseInfo.tongQuDir}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   });
      // }
      this.refreshIntegralFiles();
    },
    // 监听积分名称变化
    onChangeIntegralName(index) {
      const item = this.integralInfo.integralList[index];
      item.file = this.buildIntegralFile(item.name || '');
      // if (this.baseInfo.isTongQu) {
      //   // 通区时
      //   if (this.baseInfo.isDir === 0) {
      //     // 同盘符，去掉盘符
      //     let tongQuDirInfo = this.baseInfo.tongQuDir.replace(/^[A-Za-z]:\\/, '');
      //     item.file = `..\\..\\..\\..\\${tongQuDirInfo}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   } else {
      //     // 不同盘符
      //     item.file = `${this.baseInfo.tongQuDir}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   }
      // } else {
      //   // 非通区时
      //   if (this.baseInfo.isDir === 1) {
      //     // 不同盘符
      //     item.file = `${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   } else {
      //     // 同盘符
      //     item.file = `..\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   }
      // }
    },
    // 监听通区目录变化
    onChangeTongQuDir(value) {
      // if (this.baseInfo.isTongQu) {
      //   // 通区时，拼接通区路径
      //   if (this.baseInfo.isDir === 0) {
      //     // 同盘符
      //     value = value.replace(/^[A-Za-z]:\\/, '');
      //   } else {
      //     // 不同盘符
      //     value = value.replace(/\\$/, '');
      //   }
      //   this.integralInfo.integralList.forEach(item => {
      //     item.file = `..\\..\\..\\..\\${value}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   });
      // } else {
      //   // 非通区时，恢复默认或清空
      //   this.integralInfo.integralList.forEach(item => {
      //     item.file = `..\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //   });
      // }
      this.refreshIntegralFiles();
    },
    // 监听通区变化
    onChangeRadio(value) {
      // if (value) {
      //   // 通区时
      //   if (this.baseInfo.isDir === 0) {
      //     // 同盘符
      //     let tongQuDirInfo = this.baseInfo.tongQuDir.replace(/^[A-Za-z]:\\/, '');
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `..\\..\\..\\..\\${tongQuDirInfo}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   } else {
      //     // 不同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `${this.baseInfo.tongQuDir}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   }
      // } else {
      //   // 非通区时
      //   if (this.baseInfo.isDir === 1) {
      //     // 不同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   } else {
      //     // 同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `..\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   }
      // }
      this.refreshIntegralFiles();
    },
    // 监听充值脚本路径变化
    onChangeValue(value) {
      // if (this.baseInfo.isTongQu) {
      //   // 通区时
      //   if (this.baseInfo.isDir === 0) {
      //     // 同盘符，去掉盘符
      //     let tongQuDirInfo = this.baseInfo.tongQuDir.replace(/^[A-Za-z]:\\/, '');
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `..\\..\\..\\..\\${tongQuDirInfo}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   } else {
      //     // 不同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `${this.baseInfo.tongQuDir}\\Mir200\\Envir\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   }
      // } else {
      //   // 非通区时
      //   if (this.baseInfo.isDir === 1) {
      //     // 不同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   } else {
      //     // 同盘符
      //     this.integralInfo.integralList.forEach(item => {
      //       item.file = `..\\QuestDiary\\${this.baseInfo.payDir}\\充值积分\\${item.name}Save.txt`;
      //     });
      //   }
      // }
      this.refreshIntegralFiles();
    },
    // 获取模板的详情
    normalizeGiveShow(list) {
      if (!Array.isArray(list)) return;
      list.forEach((item) => {
        if (!item) return;

        const rawShow = item.show;
        if (rawShow === true) item.show = 0;
        else if (rawShow === false) item.show = 2;
        else if (rawShow === 0 || rawShow === 1 || rawShow === 2) item.show = rawShow;
        else if (rawShow === '0' || rawShow === '1' || rawShow === '2') item.show = Number(rawShow);
        else item.show = 2;

        const rawIsShow = item.isShow;
        item.isShow = rawIsShow === true || rawIsShow === 1 || rawIsShow === '1';
      });
    },
    moduleDetail(id) {
      this.$api.partmodule
        .moduleDetail({
          id: this.$route.query.id
        })
        .then((data) => {
          if (data.status === 200) {
            // 基本信息
            this.baseInfo.type = data.data.type;
            this.baseInfo.name = data.data.name;
            this.baseInfo.gameMoney = data.data.gameCurrencyType;
            this.baseInfo.gameName = data.data.currencyName;
            this.baseInfo.isShowGlod = data.data.isShowGlod;
            this.baseInfo.color = data.data.templateColor;
            this.baseInfo.command = data.data.scriptCommand;
            this.baseInfo.rate = data.data.ratio;
            this.baseInfo.chargeNpc = data.data.npcs.filter(
              (item) => item.type === true
            );
            this.baseInfo.gameEngine = data.data.gameEngine;
            this.baseInfo.webCommand = data.data.browserCommand;
            this.baseInfo.minMoney = data.data.minAmount;
            this.baseInfo.maxMoney = data.data.maxAmount;
            this.baseInfo.fixedMoney = data.data.fixedAmountGroup;
            this.baseInfo.isTongQu = data.data.isTongQu;
            this.baseInfo.isDir = data.data.isDir;
            this.baseInfo.dir = data.data.dir === null ? [] : data.data.dir.split(',');
            this.baseInfo.tongQuDir = data.data.tongQuDir;
            this.baseInfo.payDir = data.data.payDir;
            this.baseInfo.isTest = data.data.isTest;
            this.baseInfo.betch = data.data.betch;
            this.baseInfo.isBetch = data.data.isBetch;
            this.baseInfo.chargetype =
              data.data.rechargeWay === null ? '' : data.data.rechargeWay;
            this.baseInfo.gameMing =
              data.data.gameName === null ? '' : data.data.gameName;
            // 激励详情
            this.inciteInfo.checked = data.data.isContains;
            this.inciteInfo.giveList = data.data.incentives;
            this.baseInfo.giveOptionState = data.data.giveOptionState;
            // 附加赠送
            this.attachInfo.checked = data.data.showAdditional;
            this.attachInfo.attachList = data.data.additionalGives;
            this.normalizeGiveShow(this.attachInfo.attachList);
            // 积分赠送
            this.integralInfo.checked = data.data.showIntegral;
            this.integralInfo.integralList = data.data.integralGives;
            this.normalizeGiveShow(this.integralInfo.integralList);
            // 装备赠送
            this.equipmentInfo.checked = data.data.showEquip;
            this.equipmentInfo.isChecked = data.data.isShow;
            this.equipmentInfo.giveType = data.data.equipType;
            this.equipmentInfo.giveOption = data.data.giveOption;
            this.equipmentInfo.list = data.data.equipGives;
            // 红包赠送
            this.redbag.checked = data.data.redPacketState;
            this.redbag.redPacketAdditional = data.data.redPacketAdditional;
            this.redbag.redPacketIntegral = data.data.redPacketIntegral;
            this.redbag.redPacketEquip = data.data.redPacketEquip;
            this.redbag.redNPC = data.data.npcs.filter(
              (item) => item.type === false
            );
            this.redbag.redDetail = data.data.redPacketGives;
            // 充值渠道
            this.chargeInfo.checked = data.data.giveState;
            this.chargeInfo.select = data.data.giveWay;
            this.chargeInfo.redNPC = data.data.productTemplateRate;
            this.scanModel = data.data.scanModel; // 扫码支付模版
            this.installModel = data.data.installModel; // 微信密保模版
            this.safetyMoney = data.data.safetyMoney; // 安全金额
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    tongQuChange(val) {
      if (val === true) {
        this.integralInfo.integralList = [
          {
            name: '元宝消费',
            show: 2,
            isShow: false,
            file: '...\\..\\..\\..\\通区充值\\Mir200\\Envir\\QuestDiary\\7XPAY\\充值积分\\元宝消费Save.txt',
            ratio: 1,
            type: 0
          },
          {
            name: '消费积分',
            show: 2,
            isShow: false,
            file: '..\\..\\..\\..\\通区充值\\Mir200\\Envir\\QuestDiary\\7XPAY\\充值积分\\消费积分Save.txt',
            ratio: 1,
            type: 0
          }
        ];// 积分详情;
      } else {
        this.integralInfo.integralList = [
          {
            name: '元宝消费',
            show: 2,
            isShow: false,
            file: '..\\QuestDiary\\7XPAY\\充值积分\\元宝消费Save.txt',
            ratio: 1,
            type: 0
          },
          {
            name: '消费积分',
            show: 2,
            isShow: false,
            file: '..\\QuestDiary\\7XPAY\\充值积分\\消费积分Save.txt',
            ratio: 1,
            type: 0
          }
        ];// 积分详情;
      }
    },
    /* -----------------------1.基本信息相关处理------------------------ */
    // 游戏币的切换选项
    gameMoneyChange() {
      if (this.baseInfo.gameMoney === 0) {
        this.baseInfo.gameName = '元宝';
        this.baseInfo.command = 'GAMEGOLD +';
      } else if (this.baseInfo.gameMoney === 1) {
        this.baseInfo.gameName = '金币';
        this.baseInfo.command = 'give 金币';
      } else if (this.baseInfo.gameMoney === 3) {
        this.baseInfo.gameName = '金元';
        this.baseInfo.command = 'COLLECTPOINT +';
      } else {
        this.baseInfo.gameName = '';
        this.baseInfo.command = '';
      }
    },
    // 添加充值NPC
    addchargeNpc() {
      this.baseInfo.chargeNpc.push({
        looks: 0,
        map: '0',
        name: '充值使者',
        type: true,
        xAxis: 0,
        yAxis: 0
      });
    },
    // 删除充值NPC的单行
    delchargeNpc(index) {
      this.baseInfo.chargeNpc.splice(index, 1);
    },
    // 游戏引擎下拉
    gameEngineDrow() {
      this.$api.partmodule
        .gameEnginedrow()
        .then((data) => {
          if (data.status === 200) {
            this.baseInfo.gameEnginelist = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取默认最小金额
    getMimicharge() {
      this.$api.home
        .rechargeDefault()
        .then((data) => {
          if (data.status === 200) {
            this.baseInfo.sysMinMoney = data.data.rechargeMinAmount;
            this.baseInfo.minMoney = data.data.rechargeMinAmount;
            this.baseInfo.sysMaxMoney = data.data.rechargeMaxAmount;
            this.baseInfo.maxMoney = data.data.rechargeMaxAmount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏引擎切换
    gameEngineChange(label) {
      const selected = this.gameEnginedrow.find(item => item.engine === label);
      const value = selected ? selected.command : '';
      this.baseInfo.webCommand = value;
      this.baseInfo.gameEngine = label;
    },
    /* -----------------------2.激励赠送相关处理------------------------ */
    // 添加赠送
    addIncite() {
      this.inciteInfo.giveList.push({
        amount: 0,
        giveAmount: 0
      });
    },
    // 删除赠送行
    delIncite(index) {
      this.inciteInfo.giveList.splice(index, 1);
    },
    /* -----------------------3.附加赠送相关处理------------------------ */
    // 添加附加赠送
    addAttach() {
      this.attachInfo.attachList.push({
        name: '',
        show: 2,
        isShow: false,
        command: '',
        ratio: '',
        type: 0
      });
    },
    // 删除附加赠送
    delAttach(index) {
      this.attachInfo.attachList.splice(index, 1);
    },
    /* -----------------------4.积分赠送相关处理------------------------ */
    // 添加积分赠送
    addIntegral() {
      this.integralInfo.integralList.push({
        name: '',
        show: 2,
        isShow: false,
        file: '',
        ratio: 0,
        type: 0
      });
    },
    // 添加积分赠送
    delIntegral(index) {
      this.integralInfo.integralList.splice(index, 1);
    },
    /* -----------------------5.装备赠送相关处理------------------------ */
    // 添加装备赠送
    addequip() {
      this.equipmentInfo.list.push({
        amount: '',
        command: 'Give',
        name: ''
      });
    },
    // 添加积分赠送
    delequip(index) {
      this.equipmentInfo.list.splice(index, 1);
    },
    /* -----------------------6.红包赠送相关处理------------------------ */
    // 添加红包NPC
    addredNpc() {
      this.redbag.redNPC.push({
        looks: 0,
        map: '0',
        name: '红包使者',
        type: false,
        xAxis: 0,
        yAxis: 0
      });
    },
    //  删除红包NPC
    delredNpc(index) {
      this.redbag.redNPC.splice(index, 1);
    },
    // 添加红包详情
    addred() {
      this.redbag.redDetail.push({
        amount: 0,
        startAmount: 0,
        endAmount: 0
      });
    },
    // 删除红包详情
    delred(index) {
      this.redbag.redDetail.splice(index, 1);
    },
    /* -----------------------7.充值渠道相关处理------------------------ */
    // 充值渠道中的支付添加
    addItem(index) {
      if (this.chargeInfo.oneSet) {
        this.chargeInfo.redNPC.forEach((item) => {
          item.amountRate.push({ amount: 0, rate: 0 });
        });
      } else {
        this.chargeInfo.redNPC[index].amountRate.push({ amount: 0, rate: 0 });
      }
    },
    // 充值渠道中的支付删除
    deleteItem(index) {
      if (this.chargeInfo.oneSet) {
        let flag = false;
        this.chargeInfo.redNPC.forEach((item) => {
          if (item.amountRate.length < 4) {
            flag = true;
          }
        });
        if (flag) {
          this.$messageError('有设置项少于3组金额！');
          return;
        }
        this.chargeInfo.redNPC.forEach((item) => {
          item.amountRate.splice(-1, 1);
        });
      } else {
        if (this.chargeInfo.redNPC[index].amountRate.length < 4) {
          this.$messageError('最少设置3组金额！');
        } else {
          this.chargeInfo.redNPC[index].amountRate.splice(-1, 1);
        }
      }
    },
    // 一键设置时，金额控制
    moneyInp(index, number) {
      if (this.chargeInfo.oneSet) {
        this.chargeInfo.redNPC.forEach((item) => {
          if (item.amountRate.length >= index + 1) {
            item.amountRate[index].amount = number;
          }
        });
      }
    },
    // 一键设置时，比例控制
    rateInp(index, number) {
      if (this.chargeInfo.oneSet) {
        this.chargeInfo.redNPC.forEach((item) => {
          if (item.amountRate.length >= index + 1) {
            item.amountRate[index].rate = number;
          }
        });
      }
    },
    // 固定比例赠送时的一键设置
    fixedInp(number) {
      if (this.chargeInfo.oneSet) {
        this.chargeInfo.redNPC.forEach((item) => {
          item.rate = number;
        });
      }
    },
    // 验证校验
    inputCheck() {
      // 基本信息的验证
      if (this.baseInfo.name === '') {
        // 模板名称输入
        this.collspa.show1 = true;
        this.$nextTick(() => {
          this.$refs.baseName.focus();
          this.$messageError('此处必填！');
        });
        return true;
      } else if (this.baseInfo.gameName === '') {
        // 游戏币名称输入
        this.collspa.show1 = true;
        this.$nextTick(() => {
          this.$refs.baseGameName.focus();
          this.$messageError('此处必填！');
        });
        return true;
      } else if (
        this.baseInfo.rate === '' ||
        this.baseInfo.rate.toString().indexOf('.') > -1
      ) {
        // 兑换比例
        this.collspa.show1 = true;
        this.$nextTick(() => {
          this.$refs.baseRate.focus();
          this.$messageError('必须整数！');
        });
        return true;
      } else if (
        this.baseInfo.minMoney === '' ||
        // this.baseInfo.minMoney.toString().indexOf('.') > -1
        parseFloat(this.baseInfo.minMoney) < this.baseInfo.sysMinMoney
      ) {
        // 最小金额
        this.collspa.show1 = true;
        this.$nextTick(() => {
          this.$refs.baseMinMoney.focus();
          this.$messageError('请输入范围内数值');
        });
        return true;
      } else if (
        this.baseInfo.maxMoney === '' ||
        // this.baseInfo.maxMoney.toString().indexOf('.') > -1
        parseFloat(this.baseInfo.maxMoney) > this.baseInfo.sysMaxMoney
      ) {
        // 最大金额
        this.collspa.show1 = true;
        this.$nextTick(() => {
          this.$refs.baseMaxMoney.focus();
          this.$messageError('请输入范围内数值');
        });
        return true;
      }
      if (this.baseInfo.type === 1 || this.baseInfo.type === 2) {
        if (this.baseInfo.command === '') {
          // 脚本命令输入
          this.collspa.show1 = true;
          this.$nextTick(() => {
            this.$refs.baseCommand.focus();
            this.$messageError('此处必填！');
          });
          return true;
        }
        for (let i = 0; i < this.baseInfo.chargeNpc.length; i++) {
          if (this.baseInfo.chargeNpc[i].name === '') {
            this.collspa.show1 = true;
            let refName = 'baseChargeName' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (this.baseInfo.chargeNpc[i].map === '') {
            this.collspa.show1 = true;
            let refName = 'baseChargeMap' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (
            this.baseInfo.chargeNpc[i].looks === '' ||
            this.baseInfo.chargeNpc[i].looks.toString().indexOf('.') > -1
          ) {
            this.collspa.show1 = true;
            let refName = 'baseChargeLooks' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.baseInfo.chargeNpc[i].xAxis === '' ||
            this.baseInfo.chargeNpc[i].xAxis.toString().indexOf('.') > -1
          ) {
            this.collspa.show1 = true;
            let refName = 'baseChargexAxis' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.baseInfo.chargeNpc[i].yAxis === '' ||
            this.baseInfo.chargeNpc[i].yAxis.toString().indexOf('.') > -1
          ) {
            this.collspa.show1 = true;
            let refName = 'baseChargeyAxis' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          }
        }
        if (this.baseInfo.webCommand === '') {
          this.collspa.show1 = true;
          this.$nextTick(() => {
            this.$refs.baseWebCommand.focus();
            this.$messageError('此处必填！');
          });
          return true;
        }
        // 附加赠送
        for (let i = 0; i < this.attachInfo.attachList.length; i++) {
          if (this.attachInfo.attachList[i].name === '') {
            this.collspa.show3 = true;
            let refName = 'attachName' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (this.attachInfo.attachList[i].command === '') {
            this.collspa.show3 = true;
            let refName = 'attachCommand' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (
            this.attachInfo.attachList[i].ratio === ''
            // this.attachInfo.attachList[i].ratio.toString().indexOf('.') > -1
          ) {
            this.attachInfo.attachList[i].ratio = 0;
            // this.collspa.show3 = true;
            // let refName = 'attachRatio' + i;
            // this.$nextTick(() => {
            //   this.$refs[refName][0].focus();
            //   this.$messageError('必须整数！');
            // });
            // return true;
          }
        }
        // 积分赠送
        for (let i = 0; i < this.integralInfo.integralList.length; i++) {
          if (this.integralInfo.integralList[i].name === '') {
            this.collspa.show4 = true;
            let refName = 'integralName' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (this.integralInfo.integralList[i].file === '') {
            this.collspa.show4 = true;
            let refName = 'integralFile' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (
            this.integralInfo.integralList[i].ratio === '' ||
            this.integralInfo.integralList[i].ratio.toString().indexOf('.') > -1
          ) {
            this.collspa.show4 = true;
            let refName = 'integralRatio' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          }
        }
        // 装备赠送
        for (let i = 0; i < this.equipmentInfo.list.length; i++) {
          if (
            this.equipmentInfo.list[i].amount === '' ||
            this.equipmentInfo.list[i].amount.toString().indexOf('.') > -1
          ) {
            this.collspa.show5 = true;
            let refName = 'equipmentAmount' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (this.equipmentInfo.list[i].command === '') {
            this.collspa.show5 = true;
            let refName = 'equipmentCommand' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (this.equipmentInfo.list[i].name === '') {
            this.collspa.show5 = true;
            let refName = 'equipmentName' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          }
        }
        // 红包赠送
        for (let i = 0; i < this.redbag.redNPC.length; i++) {
          if (this.redbag.redNPC[i].name === '') {
            this.collspa.show6 = true;
            let refName = 'redbagName' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (this.redbag.redNPC[i].map === '') {
            this.collspa.show6 = true;
            let refName = 'redbagMap' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('此处必填！');
            });
            return true;
          } else if (
            this.redbag.redNPC[i].looks === '' ||
            this.redbag.redNPC[i].looks.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagLooks' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.redbag.redNPC[i].xAxis === '' ||
            this.redbag.redNPC[i].xAxis.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagxAxis' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.redbag.redNPC[i].yAxis === '' ||
            this.redbag.redNPC[i].yAxis.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagyAxis' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          }
        }
        for (let i = 0; i < this.redbag.redDetail.length; i++) {
          if (
            this.redbag.redDetail[i].amount === '' ||
            this.redbag.redDetail[i].amount.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagAmount' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.redbag.redDetail[i].startAmount === '' ||
            this.redbag.redDetail[i].startAmount.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagStartAmount' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          } else if (
            this.redbag.redDetail[i].endAmount === '' ||
            this.redbag.redDetail[i].endAmount.toString().indexOf('.') > -1
          ) {
            this.collspa.show6 = true;
            let refName = 'redbagEndAmount' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          }
        }
      } else if (this.baseInfo.type === 3) {
        if (this.baseInfo.chargetype === '') {
          // 充值方式
          this.collspa.show1 = true;
          this.$nextTick(() => {
            this.$refs.baseChargetype.focus();
            this.$messageError('此处必填！');
          });
          return true;
        }
      } else if (this.baseInfo.type === 0) {
        if (this.baseInfo.gameMing === '') {
          // 游戏名称
          this.collspa.show1 = true;
          this.$nextTick(() => {
            this.$refs.baseGameMing.focus();
            this.$messageError('此处必填！');
          });
          return true;
        } else if (this.baseInfo.chargetype === '') {
          // 充值方式
          this.collspa.show1 = true;
          this.$nextTick(() => {
            this.$refs.baseChargetype.focus();
            this.$messageError('此处必填！');
          });
          return true;
        }
      }
      // 激励赠送的验证
      for (let i = 0; i < this.inciteInfo.giveList.length; i++) {
        if (
          this.inciteInfo.giveList[i].amount === '' ||
          this.inciteInfo.giveList[i].amount.toString().indexOf('.') > -1
        ) {
          this.collspa.show2 = true;
          let refName = 'inciteAmount' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError('必须整数！');
          });
          return true;
        } else if (
          this.inciteInfo.giveList[i].giveAmount === '' ||
          this.inciteInfo.giveList[i].giveAmount.toString().indexOf('.') > -1
        ) {
          this.collspa.show2 = true;
          let refName = 'inciteGiveAmount' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError('必须整数！');
          });
          return true;
        }
      }
      // 充值渠道
      if (this.chargeInfo.select === 0) {
        for (let i = 0; i < this.chargeInfo.redNPC.length; i++) {
          if (
            this.chargeInfo.redNPC[i].rate === '' ||
            this.chargeInfo.redNPC[i].rate.toString().indexOf('.') > -1
          ) {
            this.collspa.show7 = true;
            let refName = 'chargeRate' + i;
            this.$nextTick(() => {
              this.$refs[refName][0].focus();
              this.$messageError('必须整数！');
            });
            return true;
          }
        }
      } else {
        for (let i = 0; i < this.chargeInfo.redNPC.length; i++) {
          for (
            let j = 0;
            j < this.chargeInfo.redNPC[i].amountRate.length;
            j++
          ) {
            if (
              this.chargeInfo.redNPC[i].amountRate[j].amount === '' ||
              this.chargeInfo.redNPC[i].amountRate[j].amount
                .toString()
                .indexOf('.') > -1
            ) {
              this.collspa.show7 = true;
              let refName = 'charge' + i + 'amount' + j;
              this.$nextTick(() => {
                this.$refs[refName][0].focus();
                this.$messageError('必须整数！');
              });
              return true;
            } else if (
              this.chargeInfo.redNPC[i].amountRate[j].rate === '' ||
              this.chargeInfo.redNPC[i].amountRate[j].rate
                .toString()
                .indexOf('.') > -1
            ) {
              this.collspa.show7 = true;
              let refName = 'charge' + i + 'rate' + j;
              this.$nextTick(() => {
                this.$refs[refName][0].focus();
                this.$messageError('必须整数！');
              });
              return true;
            }
          }
        }
      }

      // 数据中的一些number类型进行转换
      this.baseInfo.rate = parseInt(this.baseInfo.rate);
      this.baseInfo.minMoney = parseFloat(this.baseInfo.minMoney);
      this.baseInfo.maxMoney = parseFloat(this.baseInfo.maxMoney);
      if (this.baseInfo.type === 1 || this.baseInfo.type === 2) {
        for (let i = 0; i < this.baseInfo.chargeNpc.length; i++) {
          this.baseInfo.chargeNpc[i].looks = parseInt(
            this.baseInfo.chargeNpc[i].looks
          );
          this.baseInfo.chargeNpc[i].xAxis = parseInt(
            this.baseInfo.chargeNpc[i].xAxis
          );
          this.baseInfo.chargeNpc[i].yAxis = parseInt(
            this.baseInfo.chargeNpc[i].yAxis
          );
        }
        // 附加
        for (let i = 0; i < this.attachInfo.attachList.length; i++) {
          this.attachInfo.attachList[i].ratio = parseInt(
            this.attachInfo.attachList[i].ratio
          );
        }
        // 积分
        for (let i = 0; i < this.integralInfo.integralList.length; i++) {
          this.integralInfo.integralList[i].ratio = parseInt(
            this.integralInfo.integralList[i].ratio
          );
        }
        // 装备
        for (let i = 0; i < this.equipmentInfo.list.length; i++) {
          this.equipmentInfo.list[i].amount = parseInt(
            this.equipmentInfo.list[i].amount
          );
        }
        // 红包
        for (let i = 0; i < this.redbag.redNPC.length; i++) {
          this.redbag.redNPC[i].looks = parseInt(this.redbag.redNPC[i].looks);
          this.redbag.redNPC[i].xAxis = parseInt(this.redbag.redNPC[i].xAxis);
          this.redbag.redNPC[i].yAxis = parseInt(this.redbag.redNPC[i].yAxis);
        }
      }
      // 激励
      for (let i = 0; i < this.inciteInfo.giveList.length; i++) {
        this.inciteInfo.giveList[i].amount = parseInt(
          this.inciteInfo.giveList[i].amount
        );
        this.inciteInfo.giveList[i].giveAmount = parseInt(
          this.inciteInfo.giveList[i].giveAmount
        );
      }
      // 充值渠道
      for (let i = 0; i < this.chargeInfo.redNPC.length; i++) {
        for (let j = 0; j < this.chargeInfo.redNPC[i].amountRate.length; j++) {
          this.chargeInfo.redNPC[i].amountRate[j].amount = parseInt(
            this.chargeInfo.redNPC[i].amountRate[j].amount
          );
          this.chargeInfo.redNPC[i].amountRate[j].rate = parseInt(
            this.chargeInfo.redNPC[i].amountRate[j].rate
          );
        }
      }
      for (let i = 0; i < this.chargeInfo.redNPC.length; i++) {
        this.chargeInfo.redNPC[i].rate = parseInt(
          this.chargeInfo.redNPC[i].rate
        );
      }
      return false;
    },
    // 提交配置
    submit() {
      if (this.editFlag) {
        this.editFlag = false;
        let flag = this.inputCheck();
        if (flag) {
          this.editFlag = true;
          return;
        }
        this.$api.partmodule
          .cloneModule({
            // 基本信息
            type: this.baseInfo.type,
            name: this.baseInfo.name,
            gameCurrencyType: this.baseInfo.gameMoney,
            currencyName: this.baseInfo.gameName,
            templateColor: this.baseInfo.color,
            scriptCommand: this.baseInfo.command,
            ratio: this.baseInfo.rate,
            npcs: this.baseInfo.chargeNpc.concat(this.redbag.redNPC),
            gameEngine: this.baseInfo.gameEngine,
            browserCommand: this.baseInfo.webCommand,
            minAmount: this.baseInfo.minMoney,
            maxAmount: this.baseInfo.maxMoney,
            fixedAmountGroup: this.baseInfo.fixedMoney,
            isTongQu: this.baseInfo.isTongQu,
            isShowGlod: this.baseInfo.isShowGlod,
            isDir: this.baseInfo.isDir,
            gameName: this.baseInfo.gameMing,
            rechargeWay: this.baseInfo.chargetype,
            tongQuDir: this.baseInfo.tongQuDir,
            payDir: this.baseInfo.payDir,
            safetyMoney: this.safetyMoney,
            isTest: this.baseInfo.isTest,
            betch: this.baseInfo.betch,
            isBetch: this.baseInfo.isBetch,
            // dir: Array.isArray(this.baseInfo.dir) ? this.baseInfo.dir.join(',') : this.baseInfo.dir,
            dir: 'C',
            scanModel: this.scanModel, // 扫码支付模版
            installModel: this.installModel, // 微信密保模版
            // 激励详情
            isContains: this.inciteInfo.checked,
            incentives: this.inciteInfo.giveList,
            giveOptionState: this.inciteInfo.giveOptionState,
            // 附加赠送
            showAdditional: this.attachInfo.checked,
            additionalGives: this.attachInfo.attachList,
            // 积分赠送
            showIntegral: this.integralInfo.checked,
            integralGives: this.integralInfo.integralList,
            // 装备赠送
            showEquip: this.equipmentInfo.checked,
            isShow: this.equipmentInfo.isChecked,
            equipType: this.equipmentInfo.giveType,
            giveOption: this.equipmentInfo.giveOption,
            equipGives: this.equipmentInfo.list,
            // 红包赠送
            redPacketState: this.redbag.checked,
            redPacketAdditional: this.redbag.redPacketAdditional,
            redPacketIntegral: this.redbag.redPacketIntegral,
            redPacketEquip: this.redbag.redPacketEquip,
            redPacketGives: this.redbag.redDetail,
            // 充值渠道
            giveState: this.chargeInfo.checked,
            giveWay: this.chargeInfo.select,
            TemplateProducts: this.chargeInfo.redNPC.map((item) => {
              return {
                productId: item.productId,
                rate: item.rate,
                // templateId: item.templateId,
                amountRate: item.amountRate
              };
            })
          })
          .then((data) => {
            this.editFlag = true;
            if (data.status === 200) {
              this.open();
            }
          })
          .catch((err) => {
            this.editFlag = true;
            this.$messageError(err.message);
          });
      }
    },
    // 提交成功后的提示
    open() {
      this.$confirm('克隆成功！是否继续操作？', '确认信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => { })
        .catch(() => {
          this.$router.push({ path: '/main/partmodules' });
        });
    },
    // 获取微信密保模版
    getWxmbTemplates() {
      this.$api.groupmange.getWxmbTemplates().then(res => {
        if (res && res.status === 200) {
          this.modelDrow = res.data || res; // 兼容不同返回结构
        }
      });
    },
    // 获取二维码模版-不分页
    getAllQrcodeTemplates() {
      this.$api.groupmange.getAllQrcodeTemplates().then(res => {
        if (res && res.status === 200) {
          this.qrcodeTemplatesList = res.data || [];
        }
      });
    },
    // async getAllQrcodeTemplates() {
    //   let header = await mgr();
    //   return api
    //     .get("/api/WxUserValid/GetQrcodeTemplates", {
    //       headers: {
    //         Authorization: "Bearer " + header,
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res.data)
    //       this.qrcodeTemplatesList = res.data || [];
    //     })
    //     .catch((err) => {
    //       this.$messageError(err.message);
    //     });
    // },
    // 获取扫码支付模版
    getScanTemplates() {
      this.$api.groupmange.getQrcodeTemplates().then(res => {
        if (res && res.status === 200) {
          this.scanModelDrow = res.data || res;
        }
      });
    },
    // 打开二维码模版弹窗
    openQrcodeDialog(isEdit, template) {
      this.qrcodeDialog.isEdit = isEdit;
      if (isEdit) {
        // 编辑
        this.qrcodeDialog.form = { ...template };
      } else {
        // 新增
        this.qrcodeDialog.form = {
          title: '',
          resourceCode: '',
          imageCode: '',
          serial: 3,
          xOffset: '',
          yOffset: ''
        };
      }
      this.qrcodeDialog.visible = true;
    },
    // 关闭二维码模版弹窗
    closeQrcodeDialog() {
      this.qrcodeDialog.visible = false;
      this.$refs.qrcodeForm.resetFields();
    },
    // 保存二维码模版
    saveQrcodeTemplate() {
      this.$refs.qrcodeForm.validate((valid) => {
        if (!valid) return;
        this.qrcodeDialog.loading = true;
        const { isEdit, form } = this.qrcodeDialog;
        this.$api.groupmange[isEdit ? 'editQrcodeTemplate' : 'addQrcodeTemplate'](form)
          .then((res) => {
            this.qrcodeDialog.loading = false;
            if (res.status === 200) {
              this.$messageSuccess(`${isEdit ? '编辑' : '新增'}成功！`);
              this.closeQrcodeDialog();
              this.getScanTemplates();
            }
          })
          .catch((err) => {
            this.qrcodeDialog.loading = false;
            this.$messageError(err.message);
          });
      });
    },
    // 打开微信密保模版弹窗
    openWxmbDialog(isEdit, row, gameType) {
      this.getAllQrcodeTemplates(); // 获取所有的二维码模版
      this.wxmbDialog.visible = true;
      this.wxmbDialog.isEdit = !!isEdit;
      if (isEdit && row) {
        this.wxmbDialog.form = { ...row };
        if (!this.wxmbDialog.form.npcs || !this.wxmbDialog.form.npcs.length) {
          this.wxmbDialog.form.npcs = [{ mapId: '', x: 0, y: 0, lookId: '' }];
        }
        if (!this.wxmbDialog.form.transferNpcs || !this.wxmbDialog.form.transferNpcs.length) {
          this.wxmbDialog.form.transferNpcs = [{ mapId: '', x: 0, y: 0, lookId: '' }];
        }
      } else {
        // 传奇世界
        if (gameType === '传奇世界') {
          this.wxmbDialog.form = {
            name: '',
            gameType: '传奇世界',
            qrcodeType: '',
            patchType: '',
            isForce: true,
            mbMapId: '',
            finishMapId: '',
            npcName: '',
            npcs: [{ mapId: '', x: 0, y: 0, lookId: '' }],
            transferEnable: false,
            transferMinAmount: '',
            transferNpcName: '',
            transferNpcs: [{ mapId: '', x: 0, y: 0, lookId: '' }]
          };
        } else {
          // 热血传奇
          this.wxmbDialog.form = {
            name: '',
            gameType: gameType || '',
            qrcodeType: '',
            isForce: true,
            mbMapId: '',
            finishMapId: '',
            machineVar: '',
            openidVar: '',
            wxVar: '',
            npcName: '',
            npcs: [{ mapId: '', x: 0, y: 0, lookId: '' }],
            transferEnable: false,
            transferMinAmount: '',
            transferRechargeVar: '',
            transferUsedVar: '',
            transferFlagVar: '',
            transferCoinVar: '',
            transferCoinName: '',
            transferNpcName: '',
            transferNpcs: [{ mapId: '', x: 0, y: 0, lookId: '' }]
          };
        }
      }
      this.$nextTick(() => {
        if (this.$refs.wxmbForm) this.$refs.wxmbForm.clearValidate();
      });
    },
    // 关闭微信密保模版弹窗
    closeWxmbDialog() {
      this.wxmbDialog.visible = false;
      this.$refs.wxmbForm.resetFields();
    },
    // 保存微信密保模版
    saveWxmbTemplate() {
      this.$refs.wxmbForm.validate((valid) => {
        if (!valid) return;
        this.wxmbDialog.loading = true;
        const { isEdit, form } = this.wxmbDialog;
        this.$api.groupmange[isEdit ? 'editWxmbTemplate' : 'addWxmbTemplate'](form)
          .then((res) => {
            this.wxmbDialog.loading = false;
            if (res.status === 200) {
              this.$messageSuccess(`${isEdit ? '编辑' : '新增'}成功！`);
              this.closeWxmbDialog();
              this.getWxmbTemplates();
            }
          })
          .catch((err) => {
            this.wxmbDialog.loading = false;
            this.$messageError(err.message);
          });
      });
    },
    addNpc() {
      this.wxmbDialog.form.npcs.push({ mapId: '', x: 0, y: 0, lookId: '' });
    },
    removeNpc(idx) {
      this.wxmbDialog.form.npcs.splice(idx, 1);
    },
    addTransferNpc() {
      this.wxmbDialog.form.transferNpcs.push({ mapId: '', x: 0, y: 0, lookId: '' });
    },
    removeTransferNpc(idx) {
      this.wxmbDialog.form.transferNpcs.splice(idx, 1);
    }
  },
  created() {
    this.moduleDetail();
    this.gameEngineDrow();
    this.getMimicharge();
    this.getWxmbTemplates(); // 获取微信密保模版
    this.getScanTemplates(); // 获取扫码支付模版
    this.getAllQrcodeTemplates(); // 获取所有的二维码模版
    this.refreshIntegralFiles();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.tablebox {
  width: 680px;

  table {
    th {
      height: 30px;
      font-weight: normal;
      color: #63aafa;
    }

    td {
      padding: 5px 8px;
      color: #999;
      font-size: 14px;
    }
  }
}

.chargelist {
  width: 800px;

  li {
    float: left;
    margin-right: 15px;
    margin-bottom: 10px;

    .tit {
      font-size: 14px;
      color: #63aafa;
      float: left;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: right;
      margin-right: 8px;
    }

    .inp {
      float: left;
      width: 100px;
    }
  }
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
        content: '';
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

.bg_eee {
  background-color: #ddd;
  padding-left: 15px;
  background-image: none;

  &:hover {
    background-color: #e3e3e3;
  }

  .arrow {
    float: right;
    width: 18px;
    height: 25px;
    background: url(../assets/images/arrow.png) no-repeat center 0;
    margin-top: 9px;
    margin-right: 20px;

    &.active {
      background-position-y: -36px;
    }
  }
}

.accountList {
  font-size: 14px;
  margin-top: 20px;

  .tit {
    float: left;
    width: 91px;
    color: #63aafa;
    height: 30px;
    line-height: 30px;
    text-align: right;
  }

  .listbox {
    float: left;
    max-width: 830px;
    margin-left: 10px;
    color: #00b066;
    overflow-x: auto;

    table {
      td {
        padding: 0 6px;
        width: 100px;
        min-width: 100px;

        &.firstd {
          width: 110px;
          min-width: 110px;

          .inp {
            &.secondinp {
              margin-left: 32px;
            }
          }
        }

        .inp {
          width: 60px;
          margin: 0 4px;

          &::v-deep .el-input__inner {
            padding: 0 8px;
          }

          &.secondinp {
            margin-left: 18px;
          }
        }
      }
    }
  }

  .btnbox {
    float: left;
    padding-top: 6px;
    margin-left: 10px;
    width: 80px;
  }
}

.colorBox {
  margin-left: 20px;

  ul {
    border: 1px solid #63aafa;
    width: 48px;

    li {
      float: left;
      width: 16px;
      height: 16px;
      cursor: pointer;

      &.color0 {
        background: #606266;

        &.on {
          background: #606266 url(../assets/images/color.png) no-repeat right bottom;
        }
      }

      &.color1 {
        background: #fe0000;

        &.on {
          background: #fe0000 url(../assets/images/color.png) no-repeat right bottom;
        }
      }

      &.color2 {
        background: #ff00ff;

        &.on {
          background: #ff00ff url(../assets/images/color.png) no-repeat right bottom;
        }
      }

      &.color3 {
        background: #0000ff;

        &.on {
          background: #0000ff url(../assets/images/color.png) no-repeat right bottom;
        }
      }

      &.color4 {
        background: #008712;

        &.on {
          background: #008712 url(../assets/images/color.png) no-repeat right bottom;
        }
      }

      &.color5 {
        background: #ff9000;

        &.on {
          background: #ff9000 url(../assets/images/color.png) no-repeat right bottom;
        }
      }
    }
  }
}

.inputColorBox {
  &::v-deep .el-input {
    &.inputColor0 {
      .el-input__inner {
        color: #606266;
      }
    }

    &.inputColor1 {
      .el-input__inner {
        color: #fe0000;
      }
    }

    &.inputColor2 {
      .el-input__inner {
        color: #ff00ff;
      }
    }

    &.inputColor3 {
      .el-input__inner {
        color: #0000ff;
      }
    }

    &.inputColor4 {
      .el-input__inner {
        color: #008712;
      }
    }

    &.inputColor5 {
      .el-input__inner {
        color: #ff9000;
      }
    }
  }
}

.wxmb-dialog-scroll {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 10px;
}
.custom-select .el-select-dropdown__list {
  max-height: 500px;
}
</style>
