<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-23 18:08:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb25">
      <div v-if="dialogshow">
        <!-- 增加：账户类型选择 -->
        <el-form ref="openForm" :model="form" :rules="rules" label-width="120px" class="open-account-form">
          <el-form-item label="账户类型" prop="accountType">
            <el-radio-group v-model="form.accountType">
              <el-radio-button label="personal">个人</el-radio-button>
              <el-radio-button label="company">企业</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <!-- 个人/企业共用字段 -->
          <el-form-item label-width="150px" label="开户银行" prop="bank">
            <el-select v-model="form.bank" placeholder="请选择" @change="checkBankCode">
              <el-option v-for="item in bankList" :key="item.mark" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="150px" label="银行卡号" prop="bankNo">
            <el-input v-model="form.bankNo" placeholder="请输入银行卡号" />
          </el-form-item>
          <el-form-item label-width="150px" v-if="form.accountType === 'company'" label="开户支行名" prop="brachName">
            <el-input v-model="form.brachName" placeholder="请输入开户支行名" />
          </el-form-item>
          <el-form-item label-width="150px" v-if="form.accountType === 'company'" label="联行号" prop="liaisonNumber">
            <el-input v-model="form.liaisonNumber" placeholder="请输入联行号" />
          </el-form-item>
          <el-form-item label-width="150px" label="银行预留电话" prop="bankPhone">
            <el-input v-model="form.bankPhone" placeholder="请输入银行预留电话" />
          </el-form-item>
          <el-form-item label-width="150px" label="收款人" prop="name">
            <el-input v-model="form.name" placeholder="请输入收款人" />
          </el-form-item>

          <!-- 企业时显示公司名称 -->
          <el-form-item label-width="150px" v-if="form.accountType === 'company'" label="公司名称" prop="totalAccountsName">
            <el-input v-model="form.totalAccountsName" placeholder="请输入公司名称" />
          </el-form-item>

          <el-form-item label-width="150px" label="身份证号" prop="idCard">
            <div style="display:flex;align-items:center;gap:12px;width:100%;">
              <el-input v-model="form.idCard" placeholder="请输入身份证号" style="flex:1" />
            </div>
          </el-form-item>
          <el-form-item label="身份证起始日期" label-width="150px" prop="idEffectiveDateStart">
            <el-date-picker
              v-model="form.idEffectiveDateStart"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证终止日期" label-width="150px" prop="idEffectiveDateEnd">
            <el-date-picker
              v-model="form.idEffectiveDateEnd"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身份证照片" label-width="150px" prop="idCard">
            <div style="display:flex;gap:8px;align-items:center;">
              <el-upload class="upload-id" :before-upload="beforeUploadIdFront" :on-remove="removeIdFront" :limit="1"
                action="" :show-file-list=true>
                <el-button size="mini">上传身份证正面</el-button>
              </el-upload>
              <el-upload class="upload-id" :before-upload="beforeUploadIdBack" :on-remove="removeIdBack" :limit="1"
                action="" :show-file-list=true>
                <el-button size="mini">上传身份证反面</el-button>
              </el-upload>
            </div>
            <div style="display:flex;gap:12px;margin-top:8px;">
              <div v-if="form.idCardFrontPreview"
                style="width:120px;height:80px;border:1px solid #eee;border-radius:4px;overflow:hidden;">
                <img :src="form.idCardFrontPreview" style="width:100%;height:100%;object-fit:cover" />
              </div>
              <div v-if="form.idCardBackPreview"
                style="width:120px;height:80px;border:1px solid #eee;border-radius:4px;overflow:hidden;">
                <img :src="form.idCardBackPreview" style="width:100%;height:100%;object-fit:cover" />
              </div>
            </div>
          </el-form-item>
          <!-- 企业额外字段（仅示例常用项） -->
          <div v-if="form.accountType === 'company'">
            <el-form-item label-width="150px" label="统一社会信用代码" prop="usci">
              <el-input v-model="form.usci" placeholder="请输入统一社会信用代码" />
            </el-form-item>
            <el-form-item label-width="150px" label="营业执照号" prop="businessLicenseNo">
              <el-input v-model="form.businessLicenseNo" placeholder="请输入营业执照号" />
            </el-form-item>
            <el-form-item label-width="150px" label="经营地址" prop="businessAddress">
              <el-input v-model="form.businessAddress" placeholder="请输入营业执照号" />
            </el-form-item>
            <el-form-item label-width="150px" label="营业执照起始日期" prop="businessLicenseStart">
              <el-date-picker
                v-model="form.businessLicenseStart"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择起始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="150px" label="营业执照结束日期" prop="businessLicenseEnd">
              <el-date-picker
                v-model="form.businessLicenseEnd"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择起始日期">
              </el-date-picker>
              <el-checkbox style="margin-left: 20px;" @change="changeTime" v-model="form.isCq">长期</el-checkbox>
            </el-form-item>
            <el-form-item label-width="150px" label="法人姓名" prop="legalPersonName">
              <el-input v-model="form.legalPersonName" placeholder="请输入法人姓名" />
            </el-form-item>
            <el-form-item label-width="150px" label="法人身份证号" prop="legalPersonIdNo">
              <el-input v-model="form.legalPersonIdNo" placeholder="请输入法人身份证号" />
            </el-form-item>
            <el-form-item label-width="150px" label="法人身份证起始日期" prop="idEffectiveDateStart">
              <el-date-picker
                v-model="form.idEffectiveDateStart"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择起始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label-width="150px" label="法人身份证终止日期" prop="idEffectiveDateEnd">
              <el-date-picker
                v-model="form.idEffectiveDateEnd"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择起始日期">
              </el-date-picker>
            </el-form-item>
          </div>

          <!-- 保留：证明材料（只上传该项文件） -->
          <el-form-item label-width="150px" label="证明材料" prop="proofFile" v-if="form.accountType === 'company'">
            <el-upload class="upload-demo" :before-upload="fileSelect" :on-remove="removeFile" :limit=1 drag
              action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">扩展名为
                rar，其中需提供营业执照、法人身份证正反面、受益人身份证正反面（直接或间接拥有超过25%公司股权）、结算账户证明材料等图片（均为原件照片或加盖公章的扫描件）</div>
            </el-upload>
            <span v-if="filename != ''">{{ filename }}</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button type="warning" @click="closeForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="showResult">
        <el-card class="result-card" shadow="never">
          <div class="result-header">
            <h3>分账三方个人电子账户</h3>
            <div v-if="result.state == 1" class="status"><i class="el-icon-circle-check"></i> 审核中</div>
            <div v-else-if="result.state == 2" class="status"><i class="el-icon-circle-check"></i> 开户成功</div>
            <div v-else-if="result.state == 3" class="status"><i class="el-icon-circle-check"></i> 审核失败</div>
            <div v-else-if="result.state == 4" class="status"><i class="el-icon-circle-check"></i> 账户已冻结</div>
          </div>
          <el-row :gutter="24" class="result-body">
            <el-col :span="12" class="field">
              <div class="label">开户银行</div>
              <div class="value">{{ result.bank || '—' }}</div>
            </el-col>
            <el-col :span="12" class="field">
              <div class="label">收款人</div>
              <div class="value">{{ result.name || '—' }}</div>
            </el-col>
            <el-col :span="12" class="field">
              <div class="label">身份证</div>
              <div class="value">{{ result.idCard || '—' }}</div>
            </el-col>
            <el-col :span="12" class="field">
              <div class="label">银行卡号</div>
              <div class="value">{{ result.bankNo || '—' }}</div>
            </el-col>
            <el-col :span="12" class="field">
              <div class="label">银行预留电话</div>
              <div class="value">{{ result.bankPhone || '—' }}</div>
            </el-col>
          </el-row>
          <div>
            <el-button type="primary" @click="editShow">修改绑定信息</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showResult: false,
      dialogshow: false,
      form: {
        bank: '',
        name: '',
        idCard: '',
        bankNo: '',
        bankPhone: '',
        accountType: 'personal', // 默认个人账户
        totalAccountsName: '', // 公司名称
        usci: '', // 统一社会信用代码
        businessLicenseNo: '', // 营业执照号
        legalPersonName: '', // 法人姓名
        legalPersonIdNo: '', // 法人身份证号
        proofFile: '', // 证明材料文件（保留项）
        type: 0,
        businessAddress: '',
        businessLicenseStart: this.getCerentDate(true),
        businessLicenseEnd: this.getCerentDate(false),
        idEffectiveDateStart: this.getCerentDate(true),
        idEffectiveDateEnd: this.getCerentDate(false),
        bankCode: '',
        isCq: false,
        brachName: '',
        liaisonNumber: '',
        idCardFront: '',
        idCardBack: '',
        idCardFrontPreview: '',
        idCardBackPreview: ''
      },
      filename: '',
      bankList: [],
      rules: {
        bank: [{ required: true, message: '请选择开户银行', trigger: 'blur' }],
        name: [{ required: true, message: '请输入收款人', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        bankNo: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        bankPhone: [{ required: true, message: '请输入银行预留电话', trigger: 'blur' }],
        // 证明材料必填
        proofFile: [{ required: true, message: '请上传证明材料', trigger: 'change' }],
        // 企业相关校验（仅在企业时有用）
        totalAccountsName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        usci: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        businessLicenseNo: [{ required: true, message: '请输入营业执照号', trigger: 'blur' }],
        legalPersonName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
        legalPersonIdNo: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' }],
        businessAddress: [{ required: true, message: '请输入经营地址', trigger: 'blur' }],
        businessLicenseStart: [{ required: true, message: '请选择营业执照起始日期', trigger: 'change' }],
        businessLicenseEnd: [{ required: true, message: '请选择营业执照结束日期', trigger: 'change' }],
        idEffectiveDateStart: [{ required: true, message: '请选择法人身份证起始日期', trigger: 'change' }],
        idEffectiveDateEnd: [{ required: true, message: '请选择法人身份证终止日期', trigger: 'change' }],
        brachName: [{ required: true, message: '请输入开户支行名', trigger: 'blur' }],
        liaisonNumber: [{ required: true, message: '请输入联行号', trigger: 'blur' }],
        idCardFrontPreview: [{ required: true, message: '请上传身份证正面照片', trigger: 'change' }],
        idCardBackPreview: [{ required: true, message: '请上传身份证反面照片', trigger: 'change' }],
        idCardBack: [{ required: true, message: '请上传身份证反面照片', trigger: 'change' }],
        idCardFront: [{ required: true, message: '请上传身份证正面照片', trigger: 'change' }]
      },
      editForm: {
        bank: [{ required: true, message: '请选择开户银行', trigger: 'blur' }],
        name: [{ required: true, message: '请输入收款人', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        bankNo: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        bankPhone: [{ required: true, message: '请输入银行预留电话', trigger: 'blur' }]
      },
      result: {
        bank: '',
        name: '',
        idCard: '',
        bankNo: '',
        bankPhone: '',
        state: 0,
        type: 0,
        bankCode: ''
      }
    };
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result || '';
          const commaIndex = dataUrl.indexOf(',');
          const meta = dataUrl.substring(5, commaIndex); // e.g. image/png;base64
          const base64 = dataUrl.substring(commaIndex + 1);
          // 取出格式，如 png 或 jpeg 或 gif
          let format = 'png';
          if (meta.indexOf('jpeg') !== -1 || meta.indexOf('jpg') !== -1) format = 'jpeg';
          else if (meta.indexOf('png') !== -1) format = 'png';
          resolve({ format, base64, dataUrl });
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    },

    beforeUploadIdFront(file) {
      // 生成 base64 并保存成 "格式;base64"（例如 "png;iVBOR..."），同时生成 preview (dataUrl)
      this.toBase64(file)
        .then(({ format, base64, dataUrl }) => {
          this.form.idCardFront = format + ';' + base64;
          this.form.idCardFrontPreview = dataUrl;
        })
        .catch((err) => {
          this.$messageError && this.$messageError(err.message || '文件读取失败');
        });
      // 阻止 el-upload 自动上传
      return false;
    },

    beforeUploadIdBack(file) {
      this.toBase64(file)
        .then(({ format, base64, dataUrl }) => {
          this.form.idCardBack = format + ';' + base64;
          this.form.idCardBackPreview = dataUrl;
        })
        .catch((err) => {
          this.$messageError && this.$messageError(err.message || '文件读取失败');
        });
      return false;
    },

    removeIdFront() {
      this.form.idCardFront = '';
      this.form.idCardFrontPreview = '';
    },

    removeIdBack() {
      this.form.idCardBack = '';
      this.form.idCardBackPreview = '';
    },

    fileSelect(file) {
      let form = new FormData();
      form.append('file', file);
      this.$api.personCenter
        .uploadprofit(form)
        .then((data) => {
          this.form.proofFile = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    changeTime() {
      if (this.form.isCq) {
        this.form.businessLicenseEnd = '2099-12-31';
      } else {
        this.form.businessLicenseEnd = '';
      }
    },
    removeFile() {
      this.form.proofFile = '';
    },
    checkBankCode() {
      // 获取选中的银行的标识码
      var selectedBank = this.bankList.find(item => item.name === this.form.bank);
      if (selectedBank) {
        this.form.bankCode = selectedBank.mark;
        this.result.bankCode = selectedBank.mark;
      }
      // console.log(this.form.bankCode);
    },
    // 获取用户银行信息
    getBankInfo() {
      this.$api.personCenter
        .getbankInfo()
        .then((data) => {
          if (data.data) {
            this.result.bank = data.data.bankName;
            this.result.name = data.data.realName;
            this.result.idCard = data.data.idNumber;
            this.result.bankNo = data.data.bankNumber;
            this.result.bankPhone = data.data.phone;
            this.result.state = data.data.state;
            this.result.type = data.data.type;
            this.result.bankCode = data.data.bankCode;
            this.form.bankCode = data.data.bankCode;
            this.form.accountType = data.data.type === 0 ? 'personal' : 'company';
            this.form.bank = data.data.bankName;
            this.form.name = data.data.realName;
            this.form.idCard = data.data.idNumber;
            this.form.bankNo = data.data.bankNumber;
            this.form.bankPhone = data.data.phone;
            this.form.type = data.data.type;
            this.form.brachName = data.data.brachName;
            this.form.idCard = data.data.idNumber;
            this.form.businessAddress = data.data.businessAddress;
            this.form.businessLicenseEnd = this.normalizeDate(data.data.businessLicenseEnd);
            this.form.businessLicenseStart = this.normalizeDate(data.data.businessLicenseStart);
            this.form.businessLicenseNo = data.data.businessLicenseNo;
            this.form.idCardBack = data.data.idCardBackPreview;
            this.form.idCardBackPreview = data.data.idCardBackBase64;
            this.form.idCardFront = data.data.idCardFrontPreview;
            this.form.idCardFrontPreview = data.data.idCardFrontBase64;
            this.form.idEffectiveDateEnd = this.normalizeDate(data.data.idEffectiveDateEnd);
            this.form.idEffectiveDateStart = this.normalizeDate(data.data.idEffectiveDateStart);
            this.form.isCq = data.data.isCq;
            this.form.legalPersonIdNo = data.data.legalPersonIdNo;
            this.form.legalPersonName = data.data.legalPersonName;
            this.form.liaisonNumber = data.data.liaisonNumber;
            this.form.proofFile = data.data.proofFile;
            this.form.totalAccountsName = data.data.totalAccountsName;
            this.form.usci = data.data.usci;
            if (this.result.state === 0) {
              this.showResult = false;
              this.dialogshow = true;
            } else {
              this.showResult = true;
              this.dialogshow = false;
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    editShow() {
      this.showResult = false;
      this.dialogshow = true;
    },
    closeForm() {
      this.showResult = true;
      this.dialogshow = false;
    },
    // 获取银行列表
    getSystemBankInfo() {
      this.$api.personCenter
        .getSystemBankInfo()
        .then((data) => {
          // 处理银行列表数据
          console.log(data);
          this.bankList = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          // console.log(data.data);
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 提交修改信息
    async submitUpdate() {
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) return;
        this.$api.personCenter
          .updateBankInfo({
            bankName: this.result.bank,
            realName: this.result.name,
            idNumber: this.result.idCard,
            bankNumber: this.result.bankNo,
            phone: this.result.bankPhone,
            bankCode: this.result.bankCode
          })
          .then((data) => {
            if (data.status === 200) {
              this.$messageSuccess('操作成功！');
              this.dialogshow = false;
              // 提交成功后刷新银行信息
              this.getBankInfo();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      });
    },
    async submitForm() {
      this.$refs.openForm.validate(async (valid) => {
        if (!valid) return;
        this.form.legalPersonName = this.form.name === '' ? this.form.legalPersonName : this.form.name; // 法人姓名默认为收款人姓名
        this.type = this.form.accountType === 'personal' ? 0 : 1;
        this.$api.personCenter
          .ModifyAccountsAsync(this.form)
          .then((data) => {
            if (data.status === 200) {
              console.log(data);
              this.$messageSuccess('操作成功！');
              // 提交成功后刷新银行信息
              this.getBankInfo();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      });
    },
    normalizeDate(val) {
      if (!val) return '';
      if (typeof val === 'string') {
        return val.length >= 10 ? val.slice(0, 10) : val;
      }
      if (val instanceof Date) {
        const y = val.getFullYear();
        const m = String(val.getMonth() + 1).padStart(2, '0');
        const d = String(val.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }
      return '';
    }
  },
  created() {
    this.getUser();
    this.getBankInfo();
    this.getSystemBankInfo();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.info-title,
.result-title {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 8px;
}

.open-account-form {
  max-width: 520px;
  margin: 0 auto;
  padding-top: 18px;
}

.result-row {
  font-size: 15px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  .result-label {
    min-width: 150px;
    color: #222;
    font-weight: 500;
  }

  .result-success {
    color: #67c23a;
    font-weight: bold;
    font-size: 16px;
    margin-left: 6px;
  }

  .result-img {
    display: inline-block;
    margin-right: 8px;
  }
}

/* 美化结果卡片 */
.result-card {
  padding: 18px;
  border-radius: 6px;
  background: #fff;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.result-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.result-header .status {
  color: #67c23a;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.result-header .el-icon-circle-check {
  font-size: 16px;
  color: #67c23a;
}

.result-body .field {
  margin-bottom: 12px;
}

.result-body .label {
  color: #888;
  font-size: 13px;
  margin-bottom: 6px;
}

.result-body .value {
  color: #222;
  font-size: 15px;
  font-weight: 500;
  word-break: break-all;
}

.images .imgs {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.img-block {
  width: 180px;
  text-align: center;
}

.img-block img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.img-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.empty {
  color: #999;
  padding: 14px 0;
}

.open-result {
  margin-top: 20px;
}
</style>
