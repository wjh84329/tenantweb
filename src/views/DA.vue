<!--
 * @Description: 数据分析
 * @Author: xu wei
 * @Date: 2020-03-13 16:56:02
 * @LastEditTime: 2020-09-01 14:12:07
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home analytics-page" :class="{ 'analytics-page--sidebar': $root.uiMode === 'modern' }">
    <div class="gs_title" style="color: white;">{{ $root.uiMode === 'modern' ? activeAnalyticsLabel : '充值统计' }}</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="充值统计" name="1">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab1.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange1"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab1.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab1.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab1.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <!-- <li v-if="tab1.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab1.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'agent1'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <li>
                  <span class="txtbox">
                    <el-select v-model="tab1.area" size="small" placeholder="-所有分区-">
                      <el-option label="-所有分区-" :value="0"></el-option>
                      <el-option v-for="(item,i) in gameDrawList" :key="'subregion1'+i" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </span>
                </li>
                <el-button size="small" type="primary" @click="checkdata1">查询</el-button>
              </ul>
              <div class="below" v-if="tab1.show">
                <div id="myChart1" style="width:100%;height:500px;"></div>
              </div>
              <div class="nodatatip" v-else>暂无数据</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="时段统计" name="2">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab2.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange2"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <el-date-picker size="small" v-model="tab2.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </li>
                <!-- <li v-if="tab2.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab2.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'subregion2'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <li>
                  <span class="txtbox">
                    <el-select v-model="tab2.area" size="small" placeholder="-所有分区-">
                      <el-option label="-所有分区-" :value="0"></el-option>
                      <el-option v-for="(item,i) in gameDrawList" :key="'subregion'+i" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </span>
                </li>
                <el-button size="small" type="primary" @click="checkdata2">查询</el-button>
              </ul>
            </div>
            <div class="below" v-if="tab2.show">
              <div id="myChart2" style="width:100%;height:500px;"></div>
            </div>
            <div class="nodatatip" v-else>暂无数据</div>
          </el-tab-pane>
          <el-tab-pane label="分区统计" name="3">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab3.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange3"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab3.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab3.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab3.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <!-- <li v-if="tab3.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab3.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'subregion'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <el-button size="small" type="primary" @click="checkdata3">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab3.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="partitionName" label="所属分区" width="280">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.payAmount.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="商户收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.merchantProfit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="payCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column prop="rate" label="比率">
                      <template slot-scope="scope">
                        <span>{{(scope.row.rate*100).toFixed(2)+'%'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" background :page-sizes="[10, 20, 30, 40]" :current-page="tab3.pageIndex" :page-size="tab3.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab3.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="分组统计" name="4">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab4.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange4"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab4.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab4.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab4.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <!-- <li v-if="tab4.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab4.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'subregion'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <el-button size="small" type="primary" @click="checkdata4">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab4.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="groupName" label="分组名称">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.payAmount.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="商户收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.merchantProfit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="payCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column label="比率">
                      <template slot-scope="scope">
                        <span>{{(scope.row.rate*100).toFixed(2)+'%'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange4" @current-change="handleCurrentChange4" background :page-sizes="[10, 20, 30, 40]" :current-page="tab4.pageIndex" :page-size="tab4.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab4.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="模版统计" name="7">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab4.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange4"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab4.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab7.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab7.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <!-- <li v-if="tab4.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab4.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'subregion'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <el-button size="small" type="primary" @click="checkdata7">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab7.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column label="模版名称">
                      <template slot-scope="scope">
                        <span>{{ scope.row.templateName || scope.row.groupName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.payAmount.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="商户收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.merchantProfit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="payCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column label="比率">
                      <template slot-scope="scope">
                        <span>{{(scope.row.rate*100).toFixed(2)+'%'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange7" @current-change="handleCurrentChange7" background :page-sizes="[10, 20, 30, 40]" :current-page="tab7.pageIndex" :page-size="tab7.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab7.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="充值排行" name="5">
            <div class="opeartbox">
              <!-- <p class="fr mgt5" v-if="userType">
                代理统计：<el-switch v-model="tab5.switchBtn" active-color="#13ce66" inactive-color="#ff4949" @change="switchChange5"></el-switch>
              </p> -->
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab5.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab5.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab5.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <!-- <li v-if="tab5.switchBtn">
                  <span class="txtbox">
                    <el-select v-model="tab5.merchant" size="small" placeholder="-全部商户-">
                      <el-option label="-全部商户-" :value="0"></el-option>
                      <el-option v-for="(item,i) in agentDraw" :key="'subregion'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li> -->
                <li>
                  <span class="txtbox">
                    <el-select v-model="tab5.area" size="small" placeholder="-所有分区-">
                      <el-option label="-所有分区-" :value="0"></el-option>
                      <el-option v-for="(item,i) in gameDrawList" :key="'subregion'+i" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </span>
                </li>
                <el-button size="small" type="primary" @click="checkdata5">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab5.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="playerAccount" label="玩家账号">
                    </el-table-column>
                    <el-table-column prop="partitionName" label="分区名称">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.amount.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="商户收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.merchantProfit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="payCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column label="比率">
                      <template slot-scope="scope">
                        <span>{{(scope.row.successState*100).toFixed(2)+'%'}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange5" @current-change="handleCurrentChange5" background :page-sizes="[10, 20, 30, 40]" :current-page="tab5.pageIndex" :page-size="tab5.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab5.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="!isRestrictedAccount" label="个人IPS统计" name="6">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab6.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab6.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab6.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <el-button size="small" type="primary" @click="getlist6">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab6.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="domain" label="域名">
                    </el-table-column>
                    <el-table-column prop="visitNumber" label="访问次数">
                    </el-table-column>
                    <el-table-column prop="loginNumber" label="登录次数">
                    </el-table-column>
                    <el-table-column prop="orderCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.orderMoney.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.profit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange6" @current-change="handleCurrentChange6" background :page-sizes="[10, 20, 30, 40]" :current-page="tab6.pageIndex" :page-size="tab6.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab6.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-if="!isRestrictedAccount" label="全局IPS统计" name="8">
            <div class="opeartbox" id="ishow" v-show="money >= 498">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <el-date-picker style="width:190px;" v-model="tab8.time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab8.time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <el-button size="small" type="primary" @click="getlist8">查询</el-button>
              </ul>
              <div class="tablebox pdb15 pdt20">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab8.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="domain" label="域名">
                    </el-table-column>
                    <el-table-column prop="visitNumber" label="访问次数">
                    </el-table-column>
                    <el-table-column prop="loginNumber" label="登录次数">
                    </el-table-column>
                    <el-table-column prop="orderCount" label="支付笔数">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{scope.row.orderMoney.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="收入">
                      <template slot-scope="scope">
                        <span>{{scope.row.profit.toFixed(2)}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange8" @current-change="handleCurrentChange8" background :page-sizes="[10, 20, 30, 40]" :current-page="tab8.pageIndex" :page-size="tab8.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tab8.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      activeName: this.$root.uiMode === 'modern' && ['1', '2', '3', '4', '5', '6', '7', '8'].includes(String(this.$route.query.tab || ''))
        ? String(this.$route.query.tab)
        : '1', // tab切换
      gameDrawList: [], // 分区下拉list
      agentDraw: [], // 商户下拉
      money: 0, // 余额
      tab1: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        area: 0, // 分区
        merchant: 0,
        show: false,
        switchBtn: false
      },
      tab2: {
        time: this.getCerentTime(true), // 日期
        area: 0, // 分区
        merchant: 0,
        show: false,
        switchBtn: false
      },
      tab3: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        tableData: [],
        merchant: 0,
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        switchBtn: false
      },
      tab4: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        tableData: [],
        merchant: 0,
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        switchBtn: false
      },
      tab7: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        tableData: [],
        merchant: 0,
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        switchBtn: false
      },
      tab5: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        area: 0, // 分区
        merchant: 0,
        tableData: [],
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        switchBtn: false
      },
      tab6: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        tableData: [],
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0 // 总数据的条数
      },
      tab8: {
        time1: this.getCerentTime(true), // 日期
        time2: this.getCerentTime(false), // 日期
        tableData: [],
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0 // 总数据的条数
      }
    };
  },
  computed: {
    ...mapState(['userType', 'settlementType']),
    isRestrictedAccount() {
      const settlementType = Number(this.settlementType);
      return settlementType === 3 || settlementType === 4;
    },
    activeAnalyticsLabel() {
      const labels = {
        1: '充值统计',
        2: '时段统计',
        3: '分区统计',
        4: '分组统计',
        5: '充值排行',
        6: '个人IPS统计',
        7: '模版统计',
        8: '全局IPS统计'
      };
      return labels[this.activeName] || '充值统计';
    }
  },
  watch: {
    '$route.query.tab'(tab) {
      if (this.$root.uiMode !== 'modern') return;
      const target = String(tab || '1');
      if (!['1', '2', '3', '4', '5', '6', '7', '8'].includes(target) || target === this.activeName) return;
      this.activeName = target;
      this.$nextTick(() => this.handleClick());
    }
  },
  methods: {
    // 获取帐户信息
    getAccountInfo() {
      this.$api.home
        .getAccountInfo()
        .then((data) => {
          if (data.status === 200) {
            // console.log('用户信息'+data);
            this.money = data.data.accountAmount.toFixed(2);
            console.log(this.money);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // tab切换
    handleClick() {
      if (this.activeName === '1') {
        this.tab1.time1 = this.getCerentTime(true);
        this.tab1.time2 = this.getCerentTime(false);
        this.tab1.area = 0;
        this.tab1.merchant = 0;
        this.tab1.show = false;
        this.tab1.switchBtn = false;
        this.$nextTick(() => {
          this.getechart1();
        });
      } else if (this.activeName === '2') {
        this.tab2.time = this.getCerentTime(true);
        this.tab2.area = 0;
        this.tab2.merchant = 0;
        this.tab2.show = false;
        this.tab2.switchBtn = false;
        this.$nextTick(() => {
          this.getechart2();
        });
      } else if (this.activeName === '3') {
        this.tab3.time1 = this.getCerentTime(true); // 日期
        this.tab3.time2 = this.getCerentTime(false); // 日期
        this.tab3.tableData = [];
        this.tab3.merchant = 0;
        this.tab3.pageIndex = 1; // 页码
        this.tab3.pageSize = 20; // 每页的条数
        this.tab3.total = 0; // 总数据的条数
        this.tab3.switchBtn = false;
        this.getlist3();
      } else if (this.activeName === '4') {
        this.tab4.time1 = this.getCerentTime(true); // 日期
        this.tab4.time2 = this.getCerentTime(false); // 日期
        this.tab4.tableData = [];
        this.tab4.merchant = 0;
        this.tab4.pageIndex = 1; // 页码
        this.tab4.pageSize = 20; // 每页的条数
        this.tab4.total = 0; // 总数据的条数
        this.tab4.switchBtn = false;
        this.getlist4();
      } else if (this.activeName === '5') {
        this.tab5.time1 = this.getCerentTime(true); // 日期
        this.tab5.time2 = this.getCerentTime(false); // 日期
        this.tab5.area = 0;
        this.tab5.merchant = 0;
        this.tab5.tableData = [];
        this.tab5.pageIndex = 1; // 页码
        this.tab5.pageSize = 20; // 每页的条数
        this.tab5.total = 0; // 总数据的条数
        this.tab5.switchBtn = false;
        this.getlist5();
      } else if (this.activeName === '6') {
        this.tab6.time1 = this.getCerentTime(true); // 日期
        this.tab6.time2 = this.getCerentTime(false); // 日期
        this.tab6.tableData = [];
        this.tab6.pageIndex = 1; // 页码
        this.tab6.pageSize = 20; // 每页的条数
        this.tab6.total = 0; // 总数据的条数
        this.getlist6();
      } else if (this.activeName === '7') {
        this.tab7.time1 = this.getCerentTime(true); // 日期
        this.tab7.time2 = this.getCerentTime(false); // 日期
        this.tab7.tableData = [];
        this.tab7.pageIndex = 1; // 页码
        this.tab7.pageSize = 20; // 每页的条数
        this.tab7.total = 0; // 总数据的条数
        this.getlist7();
      } else if (this.activeName === '8') {
        if (this.money >= 498) {
          // 显示isshow
          this.tab8.time1 = this.getCerentTime(true); // 日期
          this.tab8.time2 = this.getCerentTime(false); // 日期
          this.tab8.tableData = [];
          this.tab8.pageIndex = 1; // 页码
          this.tab8.pageSize = 20; // 每页的条数
          this.tab8.total = 0; // 总数据的条数
          this.getlist8();
        } else {
          // $("#ishow").hide();
          this.$messageError('余额不足498.00，请先充值');
          this.activeName = '1';
        }
      }
    },
    // 下属商户
    subMerchantDraw() {
      this.$api.agent
        .subMerchantdraw()
        .then((data) => {
          if (data.status === 200) {
            this.agentDraw = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏分区下拉
    gameareaDrow() {
      this.$api.statics
        .gameDraw()
        .then((data) => {
          if (data.status === 200) {
            this.gameDrawList = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    /* ---------------------1.充值分析------------------------ */
    getechart1() {
      this.$api.statics
        .chargeStatic({
          StartTime: this.tab1.time1 ? this.tab1.time1 : '',
          EndTime: this.tab1.time2 ? this.tab1.time2 : '',
          PartitionId: this.tab1.area
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab1.show = false;
              return;
            } else {
              this.tab1.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              legend: {
                data: ['订单笔数', '支付金额', '商户收入']
              },
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.productName;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '订单',
                  axisLabel: {
                    formatter: '{value} 单'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '订单笔数',
                  type: 'line',
                  yAxisIndex: 0,
                  data: res.map((item) => {
                    return item.orderCount;
                  })
                },
                {
                  name: '支付金额',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                },
                {
                  name: '商户收入',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.merchantProfit;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart1')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getechartMerchant1() {
      this.$api.statics
        .chargeMerchant({
          StartTime: this.tab1.time1 ? this.tab1.time1 : '',
          EndTime: this.tab1.time2 ? this.tab1.time2 : '',
          MerchantId: this.tab1.merchant
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab1.show = false;
              return;
            } else {
              this.tab1.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              legend: {
                data: ['订单笔数', '支付金额', '商户收入']
              },
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.productName;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '订单',
                  axisLabel: {
                    formatter: '{value} 单'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '订单笔数',
                  type: 'line',
                  yAxisIndex: 0,
                  data: res.map((item) => {
                    return item.orderCount;
                  })
                },
                {
                  name: '支付金额',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                },
                {
                  name: '商户收入',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.merchantProfit;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart1')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    switchChange1(val) {
      this.tab1.area = 0;
      this.tab1.merchant = 0;
      this.tab1.show = false;
      if (this.tab1.switchBtn) {
        this.$nextTick(() => {
          this.getechartMerchant1();
        });
      } else {
        this.$nextTick(() => {
          this.getechart1();
        });
      }
    },
    checkdata1() {
      if (this.tab1.switchBtn) {
        this.$nextTick(() => {
          this.getechartMerchant1();
        });
      } else {
        this.$nextTick(() => {
          this.getechart1();
        });
      }
    },
    /* ---------------------2.时段统计------------------------ */
    getechart2() {
      this.$api.statics
        .timeStatic({
          Date: this.tab2.time ? this.tab2.time : '',
          PartitionId: this.tab2.area
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab2.show = false;
              return;
            } else {
              this.tab2.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              legend: {
                data: ['订单笔数', '支付金额', '商户收入']
              },
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.hour;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '订单',
                  minInterval: 1,
                  axisLabel: {
                    formatter: '{value} 单'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '订单笔数',
                  type: 'line',
                  yAxisIndex: 0,
                  data: res.map((item) => {
                    return item.orderCount;
                  })
                },
                {
                  name: '支付金额',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                },
                {
                  name: '商户收入',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.merchantProfit;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart2')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getechartMerchant2() {
      this.$api.statics
        .timeMerchant({
          Date: this.tab2.time ? this.tab2.time : '',
          MerchantId: this.tab2.merchant
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab2.show = false;
              return;
            } else {
              this.tab2.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              legend: {
                data: ['订单笔数', '支付金额', '商户收入']
              },
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.hour;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '订单',
                  minInterval: 1,
                  axisLabel: {
                    formatter: '{value} 单'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '订单笔数',
                  type: 'line',
                  yAxisIndex: 0,
                  data: res.map((item) => {
                    return item.orderCount;
                  })
                },
                {
                  name: '支付金额',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                },
                {
                  name: '商户收入',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: res.map((item) => {
                    return item.merchantProfit;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart2')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    switchChange2(val) {
      this.tab2.area = 0;
      this.tab2.merchant = 0;
      this.tab2.show = false;
      if (this.tab2.switchBtn) {
        this.$nextTick(() => {
          this.getechartMerchant2();
        });
      } else {
        this.$nextTick(() => {
          this.getechart2();
        });
      }
    },
    checkdata2() {
      if (this.tab2.switchBtn) {
        this.$nextTick(() => {
          this.getechartMerchant2();
        });
      } else {
        this.$nextTick(() => {
          this.getechart2();
        });
      }
    },
    /* ---------------------3.分区统计------------------------ */
    getlist3() {
      this.$api.statics
        .areaStatic({
          StartTime: this.tab3.time1 ? this.tab3.time1 : '',
          EndTime: this.tab3.time2 ? this.tab3.time2 : '',
          PageNumber: this.tab3.pageIndex,
          PageSize: this.tab3.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab3.tableData = [];
            this.tab3.total = 0;
          } else if (data.status === 200) {
            this.tab3.tableData = data.data;
            this.tab3.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlistMerchant3() {
      this.$api.statics
        .areaMerchant({
          StartTime: this.tab3.time1 ? this.tab3.time1 : '',
          EndTime: this.tab3.time2 ? this.tab3.time2 : '',
          MerchantId: this.tab3.merchant,
          PageNumber: this.tab3.pageIndex,
          PageSize: this.tab3.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab3.tableData = [];
            this.tab3.total = 0;
          } else if (data.status === 200) {
            this.tab3.tableData = data.data;
            this.tab3.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    switchChange3(val) {
      this.tab3.merchant = 0;
      this.tab3.pageIndex = 1; // 页码
      this.tab3.pageSize = 20; // 每页的条数
      this.tab3.total = 0; // 总数据的条数
      if (this.tab3.switchBtn) {
        this.getlistMerchant3();
      } else {
        this.getlist3();
      }
    },
    checkdata3() {
      this.tab3.pageIndex = 1;
      if (this.tab3.switchBtn) {
        this.$nextTick(() => {
          this.getlistMerchant3();
        });
      } else {
        this.$nextTick(() => {
          this.getlist3();
        });
      }
    },
    // 3当每页条数变化时
    handleSizeChange3(data) {
      this.tab3.pageSize = data;
      this.tab3.pageIndex = 1;
      if (this.tab3.switchBtn) {
        this.getlistMerchant3();
      } else {
        this.getlist3();
      }
    },
    // 3当前的页码变化时
    handleCurrentChange3(data) {
      this.tab3.pageIndex = data;
      if (this.tab3.switchBtn) {
        this.getlistMerchant3();
      } else {
        this.getlist3();
      }
    },
    /* ---------------------4.分组统计------------------------ */
    getlist4() {
      this.$api.statics
        .teamStatic({
          StartTime: this.tab4.time1 ? this.tab4.time1 : '',
          EndTime: this.tab4.time2 ? this.tab4.time2 : '',
          PageNumber: this.tab4.pageIndex,
          PageSize: this.tab4.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab4.tableData = [];
            this.tab4.total = 0;
          } else if (data.status === 200) {
            this.tab4.tableData = data.data;
            this.tab4.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlistMerchant4() {
      this.$api.statics
        .teamMerchant({
          StartTime: this.tab4.time1 ? this.tab4.time1 : '',
          EndTime: this.tab4.time2 ? this.tab4.time2 : '',
          MerchantId: this.tab4.merchant,
          PageNumber: this.tab4.pageIndex,
          PageSize: this.tab4.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab4.tableData = [];
            this.tab4.total = 0;
          } else if (data.status === 200) {
            this.tab4.tableData = data.data;
            this.tab4.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    switchChange4(val) {
      this.tab4.merchant = 0;
      this.tab4.pageIndex = 1; // 页码
      this.tab4.pageSize = 20; // 每页的条数
      this.tab4.total = 0; // 总数据的条数
      if (this.tab4.switchBtn) {
        this.getlistMerchant4();
      } else {
        this.getlist4();
      }
    },
    checkdata4() {
      this.tab4.pageIndex = 1;
      if (this.tab4.switchBtn) {
        this.$nextTick(() => {
          this.getlistMerchant4();
        });
      } else {
        this.$nextTick(() => {
          this.getlist4();
        });
      }
    },
    checkdata7() {
      this.tab7.pageIndex = 1;
      this.$nextTick(() => {
        this.getlist7();
      });
    },
    // 4当每页条数变化时
    handleSizeChange4(data) {
      this.tab4.pageSize = data;
      this.tab4.pageIndex = 1;
      if (this.tab4.switchBtn) {
        this.getlistMerchant4();
      } else {
        this.getlist4();
      }
    },
    // 4当前的页码变化时
    handleCurrentChange4(data) {
      this.tab4.pageIndex = data;
      if (this.tab4.switchBtn) {
        this.getlistMerchant4();
      } else {
        this.getlist4();
      }
    },
    /* ---------------------5.充值排行------------------------ */
    getlist5() {
      this.$api.statics
        .chargeRank({
          StartOrderDate: this.tab5.time1 ? this.tab5.time1 : '',
          EndOrderDate: this.tab5.time2 ? this.tab5.time2 : '',
          PartitionId: this.tab5.area,
          PageNumber: this.tab5.pageIndex,
          PageSize: this.tab5.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab5.tableData = [];
            this.tab5.total = 0;
          } else if (data.status === 200) {
            this.tab5.tableData = data.data;
            this.tab5.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlistMerchant5() {
      this.$api.statics
        .MerchantRank({
          StartOrderDate: this.tab5.time1 ? this.tab5.time1 : '',
          EndOrderDate: this.tab5.time2 ? this.tab5.time2 : '',
          MerchantId: this.tab5.merchant,
          PageNumber: this.tab5.pageIndex,
          PageSize: this.tab5.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab5.tableData = [];
            this.tab5.total = 0;
          } else if (data.status === 200) {
            this.tab5.tableData = data.data;
            this.tab5.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    switchChange5(val) {
      this.tab5.merchant = 0;
      this.tab5.area = 0;
      this.tab5.pageIndex = 1; // 页码
      this.tab5.pageSize = 20; // 每页的条数
      this.tab5.total = 0; // 总数据的条数
      if (this.tab5.switchBtn) {
        this.getlistMerchant5();
      } else {
        this.getlist5();
      }
    },
    checkdata5() {
      if (this.tab5.switchBtn) {
        this.$nextTick(() => {
          this.getlistMerchant5();
        });
      } else {
        this.$nextTick(() => {
          this.getlist5();
        });
      }
    },
    // 5当每页条数变化时
    handleSizeChange5(data) {
      this.tab5.pageSize = data;
      this.tab5.pageIndex = 1;
      if (this.tab5.switchBtn) {
        this.getlistMerchant5();
      } else {
        this.getlist5();
      }
    },
    // 5当前的页码变化时
    handleCurrentChange5(data) {
      this.tab5.pageIndex = data;
      if (this.tab5.switchBtn) {
        this.getlistMerchant5();
      } else {
        this.getlist5();
      }
    },
    /* ---------------------6.ISP统计------------------------ */
    getlist6() {
      this.$api.statics
        .ispStatic({
          StartTime: this.tab6.time1 ? this.tab6.time1 : '',
          EndTime: this.tab6.time2 ? this.tab6.time2 : '',
          PageNumber: this.tab6.pageIndex,
          PageSize: this.tab6.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab6.tableData = [];
            this.tab6.total = 0;
          } else if (data.status === 200) {
            this.tab6.tableData = data.data;
            this.tab6.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlist7() {
      this.$api.statics
        .temlStatic({
          StartTime: this.tab7.time1 ? this.tab7.time1 : '',
          EndTime: this.tab7.time2 ? this.tab7.time2 : '',
          PageNumber: this.tab7.pageIndex,
          PageSize: this.tab7.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab7.tableData = [];
            this.tab7.total = 0;
          } else if (data.status === 200) {
            this.tab7.tableData = data.data;
            this.tab7.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getlist8() {
      this.$api.statics
        .deviceStatic({
          StartTime: this.tab8.time1 ? this.tab8.time1 : '',
          EndTime: this.tab8.time2 ? this.tab8.time2 : '',
          PageNumber: this.tab8.pageIndex,
          PageSize: this.tab8.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab8.tableData = [];
            this.tab8.total = 0;
          } else if (data.status === 200) {
            this.tab8.tableData = data.data;
            this.tab8.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 6当每页条数变化时
    handleSizeChange6(data) {
      this.tab6.pageSize = data;
      this.tab6.pageIndex = 1;
      this.getlist6();
    },
    handleCurrentChange6(data) {
      this.tab6.pageIndex = data;
      if (this.tab6.switchBtn) {
        this.getlistMerchant5();
      } else {
        this.getlist6();
      }
    },
    // 6当前的页码变化时
    handleCurrentChange7(data) {
      this.tab7.pageIndex = data;
      this.getlist7();
    },
    handleSizeChange7(data) {
      this.tab7.pageSize = data;
      this.tab7.pageIndex = 1;
      this.getlist7();
    },
    handleSizeChange8(data) {
      this.tab8.pageSize = data;
      this.tab8.pageIndex = 1;
      this.getlist8();
    },
    handleCurrentChange8(data) {
      this.tab8.pageIndex = data;
      this.getlist8();
    }
  },
  created() {
    this.gameareaDrow();
    this.subMerchantDraw();
    this.getAccountInfo();
    this.$nextTick(() => {
      if (this.$root.uiMode === 'modern' && this.activeName !== '1') {
        this.handleClick();
      } else {
        this.getechart1();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.tabbox {
  width: 100%;
}
.analytics-page--sidebar ::v-deep .el-tabs__header {
  display: none;
}
.analytics-page--sidebar .gs_tabbox {
  margin-top: 0 !important;
}
.nodatatip {
  width: 100%;
  height: 500px;
  text-align: center;
  line-height: 500px;
}
.below {
  width: 100%;
  margin-top: 20px;
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: #fff;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
#tenantDaily {
  width: 600px;
  height: 400px;
  background-color: #fff;
  border: 1px #fff;
}
</style>
