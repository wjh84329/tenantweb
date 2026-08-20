<!--
 * @Description: 订单补发
 * @Author: xu wei
 * @Date: 2020-03-06 13:16:10
 * @LastEditTime: 2020-09-28 16:54:52
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">手动补发</div>
    <div class="opeartbox">
      <div class="alignmentleft">
        <h4 style="padding-left: 20px;margin-top: 10px;display: none;">手动补发</h4>
        <!-- <el-divider style="width: 90%;display: none;"></el-divider> -->
        <el-form label-width="100px">
          <el-form-item label="游戏模板：">
            <el-select v-model="template" popper-class="gs_colorSelcet" size="small" clearable
              placeholder="可不选，用于筛选分区"
              @change="templateChanged">
              <el-option v-for="(item, i) in templateDropdown" :class="'templateColor' + item.templateColor"
                :key="'template' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏分区：">
            <el-select v-model="gamearea" popper-class="gs_colorSelcet" size="small" placeholder="请选择">
              <el-option v-for="(item, i) in gameDivisiondrow" :class="'templateColor' + item.templateColor"
                :key="'gamearea' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值方式：">
            <el-select v-model="rechargemodepage" size="small" placeholder="请选择">
              <el-option v-for="(item, i) in rechargemodedrow" :key="'rechargemode' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏账号：">
            <el-input style="width: 27%;" size="small" v-model="gameaccount" placeholder="请输入游戏账号"></el-input>
          </el-form-item>
          <el-form-item label="充值金额：">
            <el-input style="width: 27%;" size="small" type="number" v-model="amountofrecharge"
              placeholder="充值金额"></el-input>
          </el-form-item>
          <el-form-item label="额外补发：" style="display: none;">
            <el-input style="width: 29%;" size="small" v-model="handextra"></el-input> %
          </el-form-item>
          <p class="mgl20 mgt10 mgb10">
            <el-checkbox v-model="isGiveAmount" name="type" style="display: none;">不包含赠送金额</el-checkbox>
            <el-checkbox v-model="isJl" name="type">关闭激励</el-checkbox>
            <el-checkbox v-model="isFj" name="type">关闭附加</el-checkbox>
            <el-checkbox v-model="isJf" name="type">关闭积分</el-checkbox>
            <el-checkbox v-model="isZb" name="type">关闭装备</el-checkbox>
            <el-checkbox v-model="isQd" name="type">关闭渠道</el-checkbox>
            <el-checkbox v-model="isRedPacketAmount" name="type">不包含红包赠送</el-checkbox>
            <el-checkbox v-model="isClose" name="type">关闭转区点赠送</el-checkbox>
            <!-- <el-checkbox v-model="isIncludeRedPacket">包含红包赠送</el-checkbox>
            <el-checkbox v-model="isIncludeGiveAmount">包含赠送金额</el-checkbox>
            <el-checkbox v-model="isOnlyYB">额外仅补发元宝</el-checkbox> -->
          </p>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleOrder">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tablebox pdb15">
        <div class="gs_tablebox">
          <el-table ref="moduleTable" size="mini" :data="orderlist1.tableData" border style="width: 100%" stripe>
            <el-table-column prop="date" label="补发时间">
              <template slot-scope="scope">
                <p style="height:18px;">{{ scope.row.reissueDate.split(' ')[0] }}</p>
                <p style="height:18px;color:#999;">{{ scope.row.reissueDate.split(' ')[1] }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="serialNumber" label="业务流水" width="210">
            </el-table-column>
            <el-table-column prop="partitionsName" label="所属分区" width="280">
            </el-table-column>
            <el-table-column prop="playerAccount" label="玩家账号">
            </el-table-column>
            <el-table-column prop="productName" label="付款方式">
            </el-table-column>
            <el-table-column prop="amount" label="补发金额">
              <template slot-scope="scope">
                <span>{{ scope.row.amount.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="补发方式">
              <template slot-scope="scope">
                <span>{{ scope.row.type ? '手动补发' : '整区补发' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mgt15 pdl20">
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background
            :page-sizes="[10, 20, 30, 40]" :current-page="orderlist1.pageIndex" :page-size="orderlist1.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="orderlist1.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 充值确认弹窗 -->
    <el-dialog title="充值确认" :visible.sync="qrcodeDialog" width="760px" :close-on-click-modal="false"
      @close="closeQrcodeDialog">
      <el-alert title="请确认您的充值信息是否正确！" type="warning" show-icon :closable="false" />

      <div class="confirm-grid">
        <div class="confirm-row">
          <div class="label">玩家账号</div>
          <div class="value">{{ result.playerAccount }}</div>
          <div class="label">充值分区</div>
          <div class="value">{{ result.partitionName }}</div>
        </div>

        <div class="confirm-row">
          <div class="label">充值金额</div>
          <div class="value">{{ result.amount.toFixed(2) }} 元</div>
          <div class="label">充值方式</div>
          <div class="value">{{ result.channelName }}</div>
        </div>

        <div class="confirm-row">
          <div class="label">其他</div>
          <div class="value" style="grid-column: span 3;">
            <span v-if="result.isClose">关闭转区点赠送</span>
            <span v-if="result.isJl">，关闭激励赠送</span>
            <span v-if="result.isFj">，关闭附加赠送</span>
            <span v-if="result.isJf">，关闭积分赠送</span>
            <span v-if="result.isZb">，关闭装备赠送</span>
            <span v-if="result.redPacketState && isRedPacketAmount == false">，包含红包赠送</span>
            <span
              v-if="!result.isClose && !result.isJl && !result.isFj && !result.isJf && !result.isZb && !result.redPacketState">无</span>
          </div>
        </div>

        <div class="section-title">充值货币 / 合计</div>
        <div class="confirm-row small">
          <div class="label">充值货币</div>
          <div class="value">{{ result.currencyName || '元宝' }} (1:{{ result.template.ratio || 1 }})</div>
          <div class="label">合计</div>
          <div class="value">
            {{ result.amount.toFixed(2) }} 元,
            {{ Math.round(result.amount * (result.template.ratio || 1)) }}{{ result.currencyName || '元宝' }}
          </div>
        </div>

        <div class="confirm-row" v-if="result.template.giveState && !result.isQd">
          <div class="label">渠道赠送</div>
          <div class="value">{{ result.channelName }} 赠送{{ result.channelGiveRate }}%</div>
          <div class="label">合计</div>
          <div class="value">
            {{ result.channelGiveAmount }}元,
            {{ Math.round(result.channelGiveAmount * result.ratio) }}{{ result.currencyName || '元宝' }}
          </div>
        </div>

        <div class="confirm-row" v-if="result.template.isContains && !result.isJl">
          <div class="label">激励赠送</div>
          <div class="value">充值{{ result.incetiveAomunt }} 赠送 {{ result.incentiveGiveAmount }}元</div>
          <div class="label">合计</div>
          <div class="value" v-if="result.template.giveOptionState == 0">{{ result.incentiveGiveAmount }}元,{{
            Math.round(result.incentiveGiveAmount * (result.template.ratio || 1)) }}{{ result.currencyName }}</div>
          <div class="value" v-if="result.template.giveOptionState == 1">{{ result.incentiveGiveAmount +
            result.channelGiveAmount }}元,{{ Math.round((result.incentiveGiveAmount + result.channelGiveAmount) * (result.template.ratio || 1)) }}{{
              result.currencyName
            }}</div>
        </div>

        <div class="section-title" v-if="!result.isFj">附加赠送</div>
        <div class="chips" v-if="!result.isFj">
          <el-tag v-for="(item, idx) in (result.infoAdditional || []).filter(i => i.type > 0 && i.name)"
            :key="'add-' + idx" type="info" class="chip">
            <span v-if="item.type === 1">{{ item.name }} * {{ Math.round(result.amount * item.ratio) }}</span>
            <span v-if="item.type === 2">{{ item.name }} * {{ Math.round((result.amount + result.channelGiveAmount) * item.ratio) }}</span>
            <span v-if="item.type === 3">{{ item.name }} * {{ Math.round((result.amount + result.incentiveGiveAmount) * item.ratio) }}</span>
            <span v-if="item.type === 4">{{ item.name }} * {{ Math.round((result.amount + result.channelGiveAmount +
              result.incentiveGiveAmount) * item.ratio) }}</span>
          </el-tag>
          <span v-if="!((result.infoAdditional || []).filter(i => i.type > 0 && i.name).length)">无</span>
          <span v-if="!(result.infoAdditional && result.infoAdditional.length)">无</span>
        </div>

        <div class="section-title" v-if="!result.isJf">积分赠送</div>
        <div class="chips" v-if="!result.isJf">
          <el-tag v-for="(item, idx) in (result.infoIntegral || []).filter(i => i.type > 0 && i.name)"
            :key="'jf-' + idx" type="success" class="chip">
            <span v-if="item.type === 1">{{ item.name }} * {{ Math.round(result.amount * item.ratio) }}</span>
            <span v-if="item.type === 2">{{ item.name }} * {{ Math.round((result.amount + result.channelGiveAmount) * item.ratio) }}</span>
            <span v-if="item.type === 3">{{ item.name }} * {{ Math.round((result.amount + result.incentiveGiveAmount) * item.ratio) }}</span>
            <span v-if="item.type === 4">{{ item.name }} * {{ Math.round((result.amount + result.channelGiveAmount +
              result.incentiveGiveAmount) * item.ratio) }}</span>
          </el-tag>
          <span v-if="!((result.infoIntegral || []).filter(i => i.type > 0 && i.name).length)">无</span>
          <span v-if="!(result.infoIntegral && result.infoIntegral.length)">无</span>
        </div>

        <div class="section-title" v-if="result.equipType !== 0 && !result.isZb">装备赠送</div>
        <div class="chips" v-if="result.equipType !== 0 && !result.isZb">
          <el-tag v-for="(item, idx) in visibleEquipItems" :key="'eq-' + idx" type="warning" class="chip">
            {{ item.name }}
          </el-tag>
          <span v-if="!visibleEquipItems.length">无</span>
        </div>

        <div class="summary">主货币总计： <strong class="summary-amount">{{ (result.amount + (result.channelGiveAmount || 0) +
          (result.incentiveGiveAmount || 0) + (result.extraGiveMoney || 0)).toFixed(2) }} 元，{{
              Math.round((result.amount +
                (result.channelGiveAmount || 0) + (result.incentiveGiveAmount || 0) + (result.extraGiveMoney || 0)) * result.ratio) }}
            {{result.currencyName}}</strong></div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeQrcodeDialog">取消</el-button>
        <el-button type="danger" @click="handOrder" :loading="handFlag">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { is } from 'core-js/core/object';

export default {
  data() {
    return {
      activeName: '0',
      handFlag: false, // 手动补发圈
      areaFlag: false, // 整区补发圈
      isClose: true, // 关闭转区点赠送
      rechargemodepage: '', // 充值方式
      rechargemodedrow: [], // 充值方式下拉
      templateDropdown: [], // 模板下拉
      template: '', // 选中模板
      gameDivisiondrow: [], // 游戏分区下拉
      gamearea: '', // 游戏分区
      gameaccount: '', // 游戏账号
      amountofrecharge: '', // 充值金额
      handextra: '', // 额外补发
      isGiveAmount: false, // 不含赠送金额
      isRedPacketAmount: false, // 包含红包赠送
      isFj: false,
      isJl: false,
      isJf: false,
      isZb: false,
      isQd: false,

      datetime: '', // 自动补发（有值则定时）
      time1: this.getCerentTime(true), // 日期
      time2: this.getCerentTime(false), // 日期
      extra: '', // 额外补发
      isLoadPartition: false,
      isIncludeManual: false,
      isIncludeRedPacket: false,
      isIncludeGiveAmount: false,
      isOnlyYB: false,
      orderlist1: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      },
      orderlist2: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      },
      result: {
        amount: 0,
        channelGiveAmount: 0,
        currencyName: '',
        equipType: 0,
        extraGiveMoney: 0,
        giveState: 0,
        incentiveGiveAmount: 0,
        infoAdditional: [],
        infoEquip: [],
        infoIntegral: [],
        isClose: true,
        isFj: false,
        isJl: false,
        isJf: false,
        isQd: false,
        isZb: false,
        partitionName: '',
        playerAccount: '',
        ratio: 0,
        rechargeType: 0,
        redPacketAdditional: false,
        redPacketAmount: 0,
        redPacketEquip: false,
        redPacketIntegral: false,
        redPacketState: false,
        channelName: '',
        template: {
          isBetch: false,
          isContains: false,
          redPacketAdditional: false,
          redPacketEquip: false,
          redPacketIntegral: false,
          redPacketState: false,
          giveState: false,
          betch: 0,
          SafetyMoney: 0
        }
      },
      qrcodeDialog: false
    };
  },
  watch: {
    datetime(n, o) {
      this.time2 = n;
    }
  },
  methods: {
    openQrcodeDialog() {
      this.qrcodeDialog = true;
    },
    // 关闭二维码模版弹窗
    closeQrcodeDialog() {
      this.qrcodeDialog = false;
    },
    // 模板
    templateChanged(data) {
      if (data === '' || data === null || typeof data === 'undefined') {
        this.gamearea = '';
        this.gameareaDrow();
        return;
      }
      for (let a = 0; a < this.templateDropdown.length; a++) {
        if (data === this.templateDropdown[a].id) {
          this.gameDivisiondrow = this.templateDropdown[a].partitions;
          this.gamearea = ''; // 游戏分区
        }
      }
    },
    // 游戏分组下拉
    gameteamDrow() {
      this.$api.reorder
        .gameTeam()
        .then((data) => {
          if (data.status === 200) {
            this.templateDropdown = this.mergeReissueTemplates(data.data);
          } else if (data.status === 204) {
            this.templateDropdown = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    mergeReissueTemplates(groups) {
      const templates = {};
      (groups || []).forEach((group) => {
        (group.reissueTemplates || []).forEach((item) => {
          if (!templates[item.id]) {
            templates[item.id] = Object.assign({}, item, { partitions: [] });
          }
          const partitionIds = {};
          templates[item.id].partitions.forEach((partition) => {
            partitionIds[partition.id] = true;
          });
          (item.partitions || []).forEach((partition) => {
            if (!partitionIds[partition.id]) {
              templates[item.id].partitions.push(partition);
              partitionIds[partition.id] = true;
            }
          });
        });
      });
      return Object.keys(templates).map((id) => templates[id]);
    },
    // tab切换
    handleClick() {
      if (this.activeName === '0') {
        this.getlist();
      } else {
        this.getlist1();
      }
    },
    // 游戏分区下拉
    gameareaDrow() {
      this.$api.reorder
        .gamelist()
        .then((data) => {
          if (data.status === 200) {
            this.gameDivisiondrow = data.data;
          } else if (data.status === 204) {
            this.gameDivisiondrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 充值方式下拉
    gamepayDrow() {
      this.$api.reorder
        .payDrow()
        .then((data) => {
          if (data.status === 200) {
            this.rechargemodedrow = data.data;
            if (this.rechargemodepage === '' && this.rechargemodedrow.length > 0) {
              this.rechargemodepage = this.rechargemodedrow[0].id;
            }
          } else if (data.status === 204) {
            this.rechargemodedrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 手动补单接口发送
    handOrder() {
      this.$api.reorder
        .handOrder({
          partitionId: this.gamearea,
          productId: this.rechargemodepage,
          playerAccount: this.gameaccount,
          payAmount: parseFloat(this.amountofrecharge),
          Extra: this.handextra === '' ? 0 : parseInt(this.handextra),
          isGiveAmount: this.isGiveAmount,
          isRedPacketAmount: this.isRedPacketAmount,
          isClose: this.isClose,
          isFj: this.isFj,
          isJf: this.isJf,
          isJl: this.isJl,
          isZb: this.isZb,
          isQd: this.isQd
        })
        .then((data) => {
          if (data.status === 200) {
            this.gamearea = '';
            this.rechargemodepage = this.rechargemodedrow.length > 0 ? this.rechargemodedrow[0].id : '';
            this.gameaccount = '';
            this.amountofrecharge = '';
            this.isGiveAmount = false;
            this.isRedPacketAmount = false;
            this.handextra = '';
            this.$messageSuccess('补发成功！');
            this.getlist();
            this.closeQrcodeDialog();
            this.handFlag = false;
          }
        })
        .catch((err) => {
          this.handFlag = false;
          this.$messageError(err.message);
        });
    },
    handOrderOk() {
      this.$api.reorder
        .handOrderOk({
          partitionId: this.gamearea,
          productId: this.rechargemodepage,
          playerAccount: this.gameaccount,
          payAmount: parseFloat(this.amountofrecharge),
          Extra: this.handextra === '' ? 0 : parseInt(this.handextra),
          isGiveAmount: this.isGiveAmount,
          isRedPacketAmount: this.isRedPacketAmount,
          isClose: this.isClose,
          isFj: this.isFj,
          isJf: this.isJf,
          isJl: this.isJl,
          isZb: this.isZb,
          isQd: this.isQd
        })
        .then((data) => {
          if (data.status === 200) {
            this.result = data.data;
            this.openQrcodeDialog();
            this.handFlag = false;
          }
        })
        .catch((err) => {
          this.handFlag = false;
          this.$messageError(err.message);
        });
    },
    // 手动补单
    handleOrder() {
      if (!this.handFlag) {
        if (this.gamearea === '') {
          this.$messageError('请选择游戏分区！');
          return;
        } else if (this.rechargemodepage === '') {
          this.$messageError('请选择充值方式！');
          return;
        } else if (this.gameaccount === '') {
          this.$messageError('请输入游戏帐号！');
          return;
        } else if (this.amountofrecharge === '') {
          this.$messageError('请输入充值金额！');
          return;
        } else if (this.handextra.toString().indexOf('.') > -1) {
          this.$messageError('额外补发必须为整数！');
          return;
        }
        this.handFlag = true;
        this.handOrderOk();
      }
    },
    // 整区补单接口发送
    areaOrder() {
      const wantSchedule = !!(this.datetime && String(this.datetime).trim());
      this.$api.reorder
        .allOrder({
          partitionId: this.gamearea,
          autoReissueDate: this.datetime,
          startTime: this.time1,
          endTime: this.time2,
          extra: this.extra === '' ? 0 : parseInt(this.extra),
          isLoadPartition: this.isLoadPartition,
          isIncludeManual: this.isIncludeManual,
          isIncludeRedPacket: this.isIncludeRedPacket,
          isIncludeGiveAmount: this.isIncludeGiveAmount,
          isOnlyYB: this.isOnlyYB,
          isAutoReissue: wantSchedule,
          isClose: this.isClose
        })
        .then((data) => {
          if (data.status === 200) {
            this.gamearea = ''; // 游戏分区
            this.datetime = ''; // 自动补发
            this.time1 = this.getCerentTime(true); // 日期
            this.time2 = this.getCerentTime(false);
            this.extra = ''; // 额外补发
            this.isLoadPartition = false;
            this.isIncludeManual = false;
            this.isIncludeRedPacket = false;
            this.isIncludeGiveAmount = false;
            this.isOnlyYB = false;
            this.areaFlag = false;
            if (wantSchedule) {
              this.$messageSuccess('定时任务已设置!');
            } else {
              this.$messageSuccess('补发成功!');
            }
            this.getlist();
          }
        })
        .catch((err) => {
          this.areaFlag = false;
          this.$messageError(err.message);
        });
    },
    // 整区补单
    allOrder() {
      if (!this.areaFlag) {
        if (this.gamearea === '') {
          this.$messageError('请选择游戏分区！');
          return;
        } else if (this.extra.toString().indexOf('.') > -1) {
          this.$messageError('额外补发必须为整数！');
          return;
        }
        this.areaFlag = true;
        // 分区检测
        this.$api.groupmange
          .checkLink({
            partitionId: this.gamearea
          })
          .then((data) => {
            if (data.status === 200) {
              let keyValue = data.data;
              if (keyValue === 'success') {
                this.areaOrder();
                return;
              }
              let indexNum = 0;
              let areaTimer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({
                    checkKey: keyValue
                  })
                  .then((data) => {
                    clearInterval(areaTimer);
                    areaTimer = null;
                    this.areaOrder();
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(areaTimer);
                      areaTimer = null;
                      this.areaFlag = false;
                      this.$messageError('分区检测失败！');
                    }
                  });
              }, 500);
            }
          })
          .catch(() => {
            this.areaFlag = false;
            this.$messageError('分区检测失败！');
          });
      }
    },
    // 补发任务list
    getlist() {
      this.$api.reorder
        .orderList1({
          PageNumber: this.orderlist1.pageIndex,
          PageSize: this.orderlist1.pageSize
        })
        .then((res) => {
          if (res.status === 204) {
            this.orderlist1.tableData = [];
            this.orderlist1.total = 0;
          } else if (res.status === 200) {
            const filtered = (res.data || []).filter(item => item.type === true);
            if (filtered.length === 0) {
              this.orderlist1.tableData = [];
              this.orderlist1.total = 0;
            } else {
              this.orderlist1.tableData = filtered;
              this.orderlist1.total = filtered.length;
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务list
    getlist1() {
      this.$api.reorder
        .orderList2({
          PageNumber: this.orderlist2.pageIndex,
          PageSize: this.orderlist2.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.orderlist2.tableData = [];
            this.orderlist2.total = 0;
          } else if (data.status === 200) {
            this.orderlist2.tableData = data.data;
            this.orderlist2.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 补发任务当每页条数变化时
    handleSizeChange1(data) {
      this.orderlist1.pageSize = data;
      this.orderlist1.pageIndex = 1;
      this.getlist();
    },
    // 补发任务当前的页码变化时
    handleCurrentChange1(data) {
      this.orderlist1.pageIndex = data;
      this.getlist();
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定?')
        .then(() => {
          this.delTask(id);
        })
        .catch(() => { });
    },
    // 删除请求
    delTask(id) {
      this.$api.reorder
        .delTask({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.orderlist2.tableData.length === 1) {
              this.orderlist2.pageIndex =
                this.orderlist2.pageIndex === 1
                  ? 1
                  : this.orderlist2.pageIndex - 1;
            }
            this.getlist1();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务当每页条数变化时
    handleSizeChange2(data) {
      this.orderlist2.pageSize = data;
      this.orderlist2.pageIndex = 1;
      this.getlist1();
    },
    // 定时任务当前的页码变化时
    handleCurrentChange2(data) {
      this.orderlist2.pageIndex = data;
      this.getlist1();
    }
  },
  computed: {
    visibleEquipItems() {
      const list = this.result.infoEquip || [];
      const amt = Number(this.result.amount || 0);
      const ch = Number(this.result.channelGiveAmount || 0);
      const inc = Number(this.result.incentiveGiveAmount || 0);
      const type = Number(this.result.equipType || 0);
      if (type === 0) return [];
      return list.filter(item => {
        const need = Number(item.amount || 0);
        if (type === 1) return amt >= need;
        if (type === 2) return amt + ch >= need;
        if (type === 3) return amt + inc >= need;
        if (type === 4) return amt + ch + inc >= need;
        return false;
      });
    }
  },
  created() {
    this.gameteamDrow();
    this.gameareaDrow();
    this.gamepayDrow();
    this.getlist();
    if (this.$route.query.id) {
      this.gamearea = this.$route.query.id;
      this.gamearea = this.$route.query.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.opeartbox {
  // height: 500px;
  padding: 0 20px 10px;
  background: #fff;
  overflow: hidden;

  .el-form-item {
    margin-bottom: 5px;
  }
}

.tablebox {
  background: #fff;
}

.alignmentleft {
  // float: left;
  // width: 40%;
  margin-left: 15%;
}

.alignmentright {
  width: 55%;
  float: right;
}
::v-deep .el-dialog__body {
  padding-bottom: 0 !important;
  max-height: 60vh;
  overflow-y: auto;
}
.confirm-grid {
  max-height: 50vh;
  overflow-y: auto;
  padding-bottom: 12px;
}
::v-deep .el-dialog__footer {
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 2;
  box-shadow: 0 -2px 8px #0001;
  padding: 10px 22px 18px;
}
.confirm-row {
  display: grid;
  grid-template-columns: 120px 1fr 120px 1fr;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  padding: 12px 0;
}

.confirm-row.small {
  padding: 8px 0;
}

.label {
  color: #888;
  font-size: 13px;
}

.value {
  color: #333;
  font-size: 14px;
}

.section-title {
  margin-top: 14px;
  margin-bottom: 8px;
  color: #666;
  font-weight: 600;
}

.chips {
  padding: 8px 0 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.chip {
  margin-right: 8px;
  margin-bottom: 6px;
}

.summary {
  padding: 14px 0 6px 0;
  color: #c40000;
  font-weight: 700;
}

.summary-amount {
  font-size: 15px;
}

.dialog-footer {
  padding: 10px 22px 18px;
}
</style>
