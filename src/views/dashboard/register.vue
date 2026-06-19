<template>
    <div class="container" style="padding-top: 120px;">
        <div class="content">
            <div class="topbox clearfix">
                <span class="tit">商户注册</span>
                <span class="tip">提示： 如果您已经注册了商户账户，请
                    <i @click="singin">直接登录</i></span>
            </div>
            <ul class="listBox" style="text-align: center;">
                <li>
                    <span class="tit">用户名</span>
                    <div class="tentbox">
                        <el-input v-model="account" placeholder="请输入登录账号" @input="checkAccount" @blur="checkAccount1">
                        </el-input>
                        <p class="tip" :class="{ wrong: !checkflag1 }">
                            账号由3~10个英文字母或数字组成
                        </p>
                    </div>
                </li>
                <li>
                    <span class="tit">商户昵称</span>
                    <div class="tentbox">
                        <el-input v-model="niceName" placeholder="请输入商户昵称" @input="checkniceName"
                            @blur="checkniceName1"></el-input>
                        <p class="tip" :class="{ wrong: !checkflag2 }">
                            商户昵称由2~8个字符串
                        </p>
                    </div>
                </li>
                <li>
                    <span class="tit">账户密码</span>
                    <div class="tentbox">
                        <el-input type="password" v-model="password" placeholder="请输入密码" @input="checkpassword"
                            @blur="checkpassword1"></el-input>
                        <p class="tip" :class="{ wrong: !checkflag3 }">
                            <span class="progress">
                                <i :class="{ on: this.saferank > 2 }">强</i>
                                <i :class="{ on: this.saferank > 1 }">中</i>
                                <i :class="{ on: this.saferank > 0 }">弱</i>
                            </span>
                            密码长度6~20个字符
                        </p>
                    </div>
                </li>
                <li>
                    <span class="tit">确认密码</span>
                    <div class="tentbox">
                        <el-input type="password" v-model="surePassword" placeholder="请再次输入密码"></el-input>
                    </div>
                </li>
                <li>
                    <span class="tit">Q Q</span>
                    <div class="tentbox">
                        <el-input v-model="qq" placeholder="请输入常用QQ" @input="qq = intNumber(qq)"></el-input>
                    </div>
                </li>
                <li>
                    <span class="tit">邮箱</span>
                    <div class="tentbox">
                        <el-input v-model="mails" placeholder="请输入邮箱" @blur="checkmail"></el-input>
                        <p class="tip" v-if="!checkflag4" :class="{ wrong: !checkflag4 }">
                            邮箱格式不正确
                        </p>
                    </div>
                </li>
                <li>
                    <span class="tit">手机号码</span>
                    <div class="tentbox">
                        <el-input v-model="phone" placeholder="请输入常用手机号" @blur="checkphone"></el-input>
                        <p class="tip" v-if="!checkflag5" :class="{ wrong: !checkflag5 }">
                            手机格式不正确
                        </p>
                    </div>
                </li>
                <!-- <li>
          <span class="tit">开户银行:</span>
          <div class="tentbox">
            <el-input v-model="bank" placeholder="所在开户银行"></el-input>
          </div>
        </li>
        <li>
          <span class="tit">开户人:</span>
          <div class="tentbox">
            <el-input v-model="person" placeholder="开户人姓名，仔细填写注册后不能修改"></el-input>
          </div>
        </li>
        <li>
          <span class="tit">银行卡号 :</span>
          <div class="tentbox">
            <el-input v-model="bankcode" placeholder="银行卡号，仔细填写注册后不能修改"></el-input>
          </div>
        </li> -->
                <li>
                    <span class="tit">验证码</span>
                    <div class="tentbox">
                        <tbody>
                            <tr>
                                <td>
                                    <el-input v-model="validcode" placeholder="验证码"></el-input>
                                </td>
                                <td>
                                    <a id="avcode" href="javascript:{}"><img class="yzm" id="code"
                                            style="width: 100px; height: 38px" alt="" :src="randomCode"
                                            v-on:click="getRandomCode" /></a>
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </li>
                <li>
                    <!-- <span class="tit"></span> -->
                    <div class="tentbox">
                        <el-checkbox v-model="sureChecked">
                            我同意并承诺遵守本站会员的注册条款<el-button type="text" @click="centerDialogVisible = true">《用户注册协议》</el-button>

                            <el-dialog title="用户协议" :visible.sync="centerDialogVisible" width="100%" top="10px"
                                lock-scroll="false" fullscreen="true" center>
                                <div>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">(1)
                                            无论用户事实上是否在注册之前认真阅读了本服务协议，只要用户点击注册页面的“我同意”选项，并按照网站注册程序成功注册为用户，即视为用户已经全文阅读并接受本服务协议之全部内容，本服务协议即在本公司和用户之间签订，对双方具有约束力。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">(2)
                                            本协议仅系本公司与本网站用户间因使用本网站而产生的权利义务关系，不涉及本网站用户之间因网上交易而产生的法律关系及法律纠纷。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第一部分</span><span style="font-family:'等线'"> 定义</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> 1、 本平台</span><span
                                            style="font-family:'等线'">台</span><span
                                            style="font-family:'等线'">是国内最大，</span><span
                                            style="font-family:'等线'">最</span><span
                                            style="font-family:'等线'">专业的从事计费交易的平台（注：并非担保交易平台）</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            2、 用户及用户注册
                                            用户必须是具备完全民事行为能力的自然人，或者是具有合法经营资格的组织。无民事行为能力人、限制民事行为能力人以及无经营资格或无特定经营资格的组织违反规定以任何方式注册为本网站
                                            用户或超过其民事权利或行为能力范围从事交易，其注册行为及与本公司之间的服务协议均自始无效，本网站一经发现，有权立即注销该用户，并追究其使用本网站“服务”的一切法律责任。用户注册是指用户登陆本网站，按要求填写相关信息并确认同意履行相关用户协议的过程。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            用户因进行交易、获取有偿服务或接触本网站服务器而发生的所有应纳税赋，以及一切硬件、软件、服务及其他方面的费用均由用户自己承担并负责自行支付。
                                            本</span><span style="font-family:'等线'">网站仅</span><span
                                            style="font-family:'等线'">作为本公司为注册用户提供的进行虚拟物品交易的网络交易计费平台，并通过该平台向用户提供在线计费交易支持服务。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第二部分</span><span style="font-family:'等线'">
                                            权利义务</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> 一、用户权利和义务</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            1、用户有权利拥有自己在本网站的通行证，包括但不限于用户名、登录密码及交易密码，并有权利使用自己的用户名及密码随时登陆本网站交易平台。用户不得以任何形式擅自转让或授权他人使用自己在本网站注册的用户名。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> 2、</span><span
                                            style="font-family:'等线'">由于点卡的</span><span
                                            style="font-family:'等线'">使用（包含神州行卡）都是一次性使用的，因此用户在销售过程请认真选择</span><span
                                            style="font-family:'等线'">卡正确</span><span
                                            style="font-family:'等线'">的面值，如因用户自己提交错误面值造成的损失由您自己承担。
                                            3、用户在本网站进行网上交易过程中如与其他用户因交易产生纠纷，可以请求网站从中予以协调。用户如发现其他用户有违法或违反</span><span
                                            style="font-family:'等线'">本服务</span><span
                                            style="font-family:'等线'">协议的行为，可以向本网站进行反映要求处理。如用户因网上交易与其他用户产生诉讼的，用户有权通过司法部门要求本网站提供相关资料。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            4、用户有义务在注册时提供自己的真实资料，并保证诸如电子邮件地址、联系电话等内容的真实性、有效性及安全性，保证本网站及其他用户可以通过</span><span
                                            style="font-family:'等线'">上述联系</span><span
                                            style="font-family:'等线'">方式与自己进行联系。同时，用户也有义务在相关资料实际变更时及时更新有关注册资料。用户保证不以他人资料在本网站进行注册或认证。用户保证当绑定注册信息（包括但不限于电子邮件、银行</span><span
                                            style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">）丢失或失效时，及时与本网站联系，并注销</span><span
                                            style="font-family:'等线'">该帐</span><span style="font-family:'等线'">户。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            5、用户应当保证在使用本网站网上交易平台进行交易过程中遵守本</span><span
                                            style="font-family:'等线'">站交易</span><span
                                            style="font-family:'等线'">原则，所有</span><span
                                            style="font-family:'等线'">出售点卡的</span><span
                                            style="font-family:'等线'">款项是直接划到</span><span
                                            style="font-family:'等线'">您交易</span><span
                                            style="font-family:'等线'">的用户的</span><span
                                            style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">中的，因此在请买卖双方确保对对方的充分信任后再进行交易，本站只负责对卡的及时处理，并不参与买卖双方的交易。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            6、用户在本网站网上计费交易平台上不得发布各类违法或违规信息。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            7、用户在本网站网上计费交易平台上不得买卖国家禁止销售的或限制销售的物品，不得买卖侵犯他人知识产权或其他合法权益的物品，也不得买卖违背社会公共利益或公共道德的或是本网站认为不适合在本网站上销售的物品。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            8、用户承诺自己在使用本网站时实施的所有行为遵守国家法律、法规和本网站的相关规定以及各种社会公 </span><span
                                            style="font-family:'等线'">共利益</span><span
                                            style="font-family:'等线'">或公共道德。对于任何法律后果的发生，用户将以自己的名义独立承担所有相应的法律责任。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            9、不作商业性利用。用户同意，不对本网站及其任何资料作商业性利用，包括但不限于在未经本网站事先书面同意的情况下，以复制、传播等方式使用在本网站上展示的任何资料。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            10、用户同意接收来自本网站的信息。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            二、本网站权利和义务
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            1、本网站有义务在现有技术上维护整个网上交易平台的正常运行，并努力提升和改进技术，使用户网上交易活动能够顺利进行。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            2、对用户在注册使用本网站网上交易平台中所遇到的与交易或注册有关的问题及反映的情况，本网站将会及时做出回复。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            3、对于在本网站网上交易平台上的不当行为或其它任何本网站认为应当终止服务的情况，本网站有权随时做出删除相关信息、终止服务提供等处理，而无须征得用户的同意。如用户违反本协议</span><span
                                            style="font-family:'等线'">及多渠道兑换平台计费</span><span
                                            style="font-family:'等线'">相关规则、声明等内容，</span><span
                                            style="font-family:'等线'">多渠道兑换平台计费</span><span
                                            style="font-family:'等线'">有权采取包括但不限于限制订单、锁定用户名、封锁个别IP、终止服务直至永久锁定用户账户等一项或多项处理措施。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            4、鉴于网上交易平台的特殊性，本网站没有义务对用户的注册资料、所有的交易行为以及与交易有关的其他事项进行事先审查，但如存在下列情况，本网站有权根据不同情况选择保留或删除相关信息以及选择继续或停止对该用户提供服务，并追究相关法律责任：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （1）用户或</span><span
                                            style="font-family:'等线'">其他第三</span><span
                                            style="font-family:'等线'">方通知本网站，认为某个具体用户或具体交易事项可能存在重大问题；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （2）用户或</span><span
                                            style="font-family:'等线'">其他第三</span><span
                                            style="font-family:'等线'">方向本网站告知交易平台上有违法或不当行为的，本网站以普通非专业交易者的知识水平标准对相关内容进行判别，可以</span><span
                                            style="font-family:'等线'">明显认为</span><span
                                            style="font-family:'等线'">这些内容或行为具有违法或不当性质的；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            5、用户在本网站网上交易过程中如与其他用户因交易产生纠纷，请求本网站从中予以调处，经本网站审核后，本网站有权通过电子邮件等联系方式向纠纷双方了解情况，并将所了解的情况通过电子邮件等联系方式互相通知对方。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            6、用户因在本网站从事网上交易与其他用户产生诉讼的，用户通过司法部门或行政部门依照法定程序要求本网站提供相关资料，本网站应积极配合并提供有关资料。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            7.、本网站有权对用户的注册资料及交易行为进行查阅，发现注册资料或交易行为中存在任何问题或怀疑，均有权向用户发出询问及要求改正的通知或者直接做出删除等处理。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            8、经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者本网站有足够事实依据可以认定用户存在违法或违反服务协议行为的，本网站有权选择下列一种或多种处理措施进行处理：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1）中止或终止用户网上交易权限；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （2）注销或删除用户</span><span
                                            style="font-family:'等线'">帐户</span><span style="font-family:'等线'">；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （3）在本网站交易平台及所在网站上以网络发布形式公布用户的违法行为。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            9、对于用户在本网站交易平台发布的下列各类信息，本网站有权在不通知用户的前提下进行删除或采取其他限制性措施，该类信息包括但不限于：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1）以规避费用为目的；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （2）本网站有理由相信存在欺诈等恶意或虚假内容；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （3）本网站有理由相信与网上交易无关或不是以交易为目的；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （4）本网站有理由相信该信息违反公共利益或可能严重损害本网站和其他用户合法利益的；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （5）其他可能损害本网站、本网站其他用户或公共利益信息。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            10、许可使用权。用户以此授予本网站独家的、全球通用的、永久的、免费的许可使用权利
                                            (以及对该许可使用权进行再授权的权利)，使本网站有权(全部或部份地)使用、复制、</span><span
                                            style="font-family:'等线'">修订、改写、发布、翻译、分发、执行和展示用户公示于网站的各类信息或制作其派生作品和</span><span
                                            style="font-family:'等线'">或</span><span
                                            style="font-family:'等线'">以现在已知或日后开发的任何形式、媒体或技术，将上述信息纳入其他作品内。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            11、关于Cookies的限制，
                                            本网站会在用户的电脑上设定或取用cookies。
                                            本网站允许那些在本网站网页上发布广告的公司到用户电脑上设定或取用cookies。在用户登录时获取资料，本网站使用cookies可为您用户提供个性化服务。
                                            如果拒绝所有
                                            cookies，用户将不能使用需要登录的本网站产品及服务内容。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第三部分</span><span style="font-family:'等线'"> 服务的中断和终止
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            1、用户同意，本网站可自行全权决定以任何理由(包括但不限于本网站认为您已违反本协议的字面意义和精神，或以不符合本协议的字面意义和精神的方式行事，或您在超过90天的时间内未以您的</span><span
                                            style="font-family:'等线'">帐户</span><span style="font-family:'等线'">及密 码登录网站等)
                                            随时终止用户的“服务”密码、</span><span style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">
                                            (或其任何部份)或您对“服务”的使用，并删除（不再保存）用户在使用“服务”中提交的“用户资料”，但已经收取手续费或服务费的，前述“终止”和/或“删除”行为应在交易完成后执行。同时本网站可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供“服务?”或其任何部</span><span
                                            style="font-family:'等线'">份。</span><span style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">终止后，本网站没有义务为您保留原</span><span
                                            style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给您或第三方。此外，您同意，本网站不就终止您接入“服务”而对您或任何第三者承担任何责任。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            2、如用户向本网站提出注销注册用户身份时，经本网站审核同意，由本网站注销该注册用户，用户即解除
                                            与本网站的服务协议关系。但注销该用户</span><span style="font-family:'等线'">帐户</span><span
                                            style="font-family:'等线'">后，本</span><span
                                            style="font-family:'等线'">网站仍</span><span style="font-family:'等线'">保留下列权利：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1）用户注销后，本网站有权保留该用户的注册资料及以前的交易行为记录；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （2）用户注销后，如用户在注销前在本网站交易平台上存在违法行为或违反合同的行为，本</span><span
                                            style="font-family:'等线'">网站仍</span><span
                                            style="font-family:'等线'">可行使</span><span
                                            style="font-family:'等线'">本服务</span><span
                                            style="font-family:'等线'">协议所规定的权利。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            3、在下列情况下，本网站可不经通知用户并以注销用户的方式终止服务：
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （1）在用户违反</span><span
                                            style="font-family:'等线'">本服务</span><span
                                            style="font-family:'等线'">协议相关规定时，本网站有权终止向该用户提供服务；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （2）如该用户在被本网站终止提供服务后，再一次直接或间接或以他人名义注册为本网站用户的，本网站有权再次单方面终止向该用户提供服务；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （3）如本网站通过用户提供的信息与用户联系时，发现用户在注册时填写的电子邮箱已不存在或无法接收电子邮件的，经本网站以其他联系方式通知用户更改，而用户在三个工作日内仍未能提供新的电子邮箱地址的，本网站有权终止向该用户提供服务；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （4）一旦本网站发现用户注册资料中主要内容是虚假的，本网站有权随时终止向该用户提供服务；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （5）</span><span
                                            style="font-family:'等线'">本服务</span><span
                                            style="font-family:'等线'">协议终止或更新时，用户未确认新的服务协议的；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （6）其它本网站认为需终止服务的情况。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            4、服务中断、终止之前用户交易行为的处理。因用户违反法律法规或者违反服务协议规定而致使本网站中断、终止对用户服务的，对于服务中断、终止之前用户交易行为依下列原则处理：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1）服务中断、终止之前，用户已经上传至本网站的物品尚未交易或尚未交易完成的，本网站有权在中断、终止服务的同时删除此项物品的相关信息。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （2）服务中断、终止之前，用户已经就其他用户出售的具体物品</span><span
                                            style="font-family:'等线'">作出</span><span
                                            style="font-family:'等线'">要约，但交易尚未结束，本网站有权在中断或终止服务的同时删除该用户的相关要约。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （3）服务中断、终止之前，用户已经与另一用户就具体交易达成一致，本网站可以不删除该项交易，但本网站有权在中断、终止服务的同时将用户被中断或终止服务的情况通知用户的交易对方。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            5、因网站升级或维护或其他技术需要导致本网站需要中断服务的，本网站将在中断服务时通知用户。但任何原因导致本网站终止或中断服务，本公司及本网站均不承担任何责任，用户因此遭受的各项损失，由用户本人自行承担。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第四部分</span><span style="font-family:'等线'"> 责任范围
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、本公司、本公司的关联公司和相关实体在任何情况下均不就因本公司的网站、本公司的服务或本协议而产生的或与之有关的利润损失或任何特别、间接或后果性的损害（无论以何种方式产生，包括疏忽）承担任何责任。用户同意就用户自身行为之合法性单独承担责任。用户同意，本公司和本公司的所有关联公司和相关实体对本公司用户的行为的法性及产生的任何结果不承担责任。
                                            用户明确理解和同意，本公司及本网站不对因下述任</span><span style="font-family:'等线'">一</span><span
                                            style="font-family:'等线'">情形而发生的任何损害赔偿（包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿，且无论本公司和/或</span><span
                                            style="font-family:'等线'">本网站是否已被告知该等损害赔偿的可能性</span><span
                                            style="font-family:'等线'">)承担任何责任：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1）使用或未能使用“服务”。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （2）用户</span><span
                                            style="font-family:'等线'">因通过</span><span
                                            style="font-family:'等线'">“服务”购买或获取任何货物、样品、数据、资料或服务，或通过或从“服务”接收任何信息或缔结任何交易所产生的获取替代货物和服务的费用。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （3）第三方未经批准的接入或第三方</span><span style="font-family:'等线'">更改您</span><span
                                            style="font-family:'等线'">的传输资料或数据，第三方对“服务”的声明或关于“服务”的行为；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （4）因任何原因而引起的与“服务”有关的任何其他事宜，包括但不限于疏忽。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第五部分</span><span style="font-family:'等线'"> 免责条款
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、鉴于本公司不参与本网站用户之间的实际交易，用户如与一名或多名其他用户发生争议，用户应就上述争议
                                            产生的或在任何方面与上述争议有关的每一种类和性质的已知或未知、可疑或非可疑、披露或未披露的索赔、要求和损害免除本公司（和本公司的高级职员、董事、代理人、关联公司、母公司、子公司和雇员）的责任，具体免责事项包括但不限于如下情形之规定：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            1、关于以下事由造成的各项损失，本公司免责：
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （1） 战争、事变、天灾地变等，不可抗力等情况；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （2） 使用者故意或过失所造成损害；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'"> （3） 因通信服务</span><span
                                            style="font-family:'等线'">提供业</span><span
                                            style="font-family:'等线'">者方面造成之通信障碍；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （4）
                                            游戏开发业者、游戏服务业者提供不良服务者或游戏开发运营者与游戏用户纠纷；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （5）用户身份之真实性、民事权利能力民事行为能力之适当性、用户信用程度之可靠性；</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （6）交易物品来源合法性、权利归属、真伪性、数量质量性能等各种事项之真实准确完整性；
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            （7）其他非本网站所能控制或掌握之事项。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            2、本公司所有连结网站皆为独立营运网站，与各用户之间的互动与交易行为本公司免责。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            3、本网站免责声明规定之事项，本公司免责。
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第六部分</span><span style="font-family:'等线'"> 知识产权保护
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、本网站所使用之作品（包括但不限于软件、图片或程序）及网站上所有内容（包括但不限于著作、图片、档案、信息、数据、网站画面的安排、网页设计）均由本公司或其它权利人依法拥有其各项知识产权（包括但不限于商标权、专利权、著作权、商业秘密与专有</span><span
                                            style="font-family:'等线'">技术等）。任何人未经本公司及权利人授权，不得擅自使用、修改、重</span><span
                                            style="font-family:'等线'">制或者</span><span
                                            style="font-family:'等线'">公开播送、改作、散布、发行、公开发表，或者进行还原工程解编或反向组</span><span
                                            style="font-family:'等线'">绎</span><span
                                            style="font-family:'等线'">。如有侵犯第三方版权、专利、商标、商业秘密或其他权利、公共利益和隐私的，除依著作权法及相关法律规定论处，并应对本公司负损害赔偿责任(包</span><span
                                            style="font-family:'等线'">括但不限于诉讼费用及律师费用等</span><span
                                            style="font-family:'等线'">)。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第七部分</span><span style="font-family:'等线'"> 通知 </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、除非另行明示载明，任何通知将发往用户在注册过程中向本公司提供的电邮地址。或者，本公司可通过已预付邮资和要求回执的保证航空信，将通知发往用户在注册过程中向本公司提供或您做出相关更新的地址。任何通知应视为于以下时间发出：</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            (a)如通过电邮发送，则电</span><span style="font-family:'等线'">邮发送</span><span
                                            style="font-family:'等线'">后24个小时，但发送方被告知电邮地址无效的，则属例外，</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            (b)如以预付邮资的信件发送，则投邮之日后三个营业日；如寄往或寄自中国，则在投邮后第七个营业日，</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            (c)如通过传真发送，则传真发出的该个营业日（只要发送人收到载明以上传真号码、发送页数和发送日期的确认报告）。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            (d)
                                            就本款而言，“营业日”指中国境内除星期六、星期日或公众假期以外的日期。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第八部分</span><span style="font-family:'等线'"> 保证 </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、本公司和本网站合作伙伴以“按现状”的方式提供本公司网站和服务，
                                            而不带有任何保证或条件，无论是明示、默示或法定的。本公司对本网站的合作伙伴向用户提供的服务不提供任何形式的承诺或保证。在法律准许的范围内，本公司和本网站合作伙伴特别否定任何有关所有权、适销性、特定目的之适用性和</span><span
                                            style="font-family:'等线'">不</span><span
                                            style="font-family:'等线'">侵权的默示保证。此外，本公司不就持续地、不受影响地或安全地接受本公司服务做出任何担保，且本公司网站的经营可能受本公司无法控制的多种外部因素影响。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第九部分</span><span style="font-family:'等线'"> 协议</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、协议完整性、可分割性、可转让性及权利保留
                                            本协议取代用户和本公司先前就相同事项订立的任何书面或口头协议，本协议与本网站之</span><span
                                            style="font-family:'等线'">任何现在</span><span
                                            style="font-family:'等线'">或将来的规则、声明构成完整的统一体。倘若本协议任何规定被裁定为无效或不可强制执行，该项规定应被撤销，而其他规定应予执行。条款标题仅为方便参阅而设，并不以任何方式界定、限制、解释或描述该条款的范围或限度。本协议和所有纳入协议的条款和规则可由本公司自行酌情决定向第三方自动转让。本公司及本</span><span
                                            style="font-family:'等线'">网站未</span><span
                                            style="font-family:'等线'">就用户或其他人士的某项违约行为采取行动，并不表明本公司及本网站撤回就任何继后或类似的</span><span
                                            style="font-family:'等线'">违约事件采取行动的权利。</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">&nbsp;</span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">第十部分</span><span style="font-family:'等线'">
                                            争议解决及法律适用
                                        </span>
                                    </p>
                                    <p
                                        style="margin-top:0pt; margin-bottom:0pt; text-align:justify; widows:0; orphans:0; font-size:10.5pt">
                                        <span style="font-family:'等线'">
                                            一、因本协议或本网站服务所引起或与之有关的任何争议应向本公司所在地安徽省蚌埠市的人民法院提起诉讼，本协议各方面均受中华人民共和国大陆地区法律的管辖。</span>
                                    </p>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                                </span>
                            </el-dialog>
                        </el-checkbox>
                    </div>
                </li>
                <li>
                    <span class="submitBtn" @click="submit">提交注册</span>
                </li>
            </ul>
        </div>
        <login-footer></login-footer>
        <!-- 注册成功弹框 -->
        <div class="dialogContainer" v-if="dialog.show">
            <div class="dialogbox">
                <div class="close" @click="dialog.show = false"></div>
                <h2 class="tit">注册成功</h2>
                <div class="box">
                    <p class="text">请联系工作人员进行审核</p>
                    <p class="tc" v-for="(item, i) in serverQQ" :key="'qq' + i">
                        <a v-for="(item, i) in serverQQ" :key="'qq' + i" class="service-qq" data-tooltip-title="点击联系客服"
                            :href="'http://wpa.qq.com/msgrd?v=1&uin=' +
                                item.qq +
                                '&site=qq&menu=yes'
                                " target="_blank">
                            <img src="../../assets/images/login/contact_qq.png" alt="" />
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Mgr from '../../assets/js/SecurityService';
export default {
  data() {
    return {
      account: '', // 登录帐号
      checkflag1: true,
      niceName: '', // 商户昵称
      checkflag2: true,
      password: '', // 账户密码
      checkflag3: true,
      saferank: 0,
      surePassword: '', // 确认密码
      qq: '', // QQ
      mails: '', // QQ
      checkflag4: true,
      phone: '', // 手机号码
      checkflag5: true,
      sureChecked: false, // 是否同意协议
      checkflag6: true,
      dialog: {
        show: false
      },
      serverQQ: [], // 客服QQ
      randomCode: ' ',
      validcode: '',
      validKey: '',
      centerDialogVisible: false
    };
  },
  created() {
    this.getinfo();
    this.getRandomCode();
  },
  methods: {
    // 登录
    singin() {
      let mgr = new Mgr();
      mgr.signIn();
    },
    // 校验帐号
    checkAccount() {
      if (this.account.length > 10) {
        this.account = this.account.substr(0, 10);
      }
    },
    checkAccount1() {
      let reg = /^[a-zA-Z0-9]{3,10}$/;
      this.checkflag1 = reg.test(this.account);
    },
    // 校验昵称
    checkniceName() {
      if (this.niceName.length > 8) {
        this.niceName = this.niceName.substr(0, 8);
      }
    },
    checkniceName1() {
      if (this.niceName.length < 2) {
        this.checkflag2 = false;
      } else {
        this.checkflag2 = true;
      }
    },
    // 校验密码
    checkpassword() {
      if (this.password.length > 20) {
        this.password = this.password.substr(0, 20);
      }
      this.saferank = 0;
      // 正则表达式验证符合要求的
      if (this.password.length < 6) return this.saferank;
      if (/\d/.test(this.password)) this.saferank++; // 数字
      if (/[a-zA-Z]/.test(this.password)) this.saferank++; // 小写
      // if (/[A-Z]/.test(this.password)) modes++; // 大写
      if (/\W/.test(this.password)) this.saferank++; // 特殊字符
    },
    checkpassword1() {
      let reg = /^[\s\S]{6,20}$/;
      this.checkflag3 = reg.test(this.password);
    },
    // 校验邮箱
    checkmail() {
      let reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      this.checkflag4 = reg.test(this.mails);
    },
    // 校验手机号
    checkphone() {
      let reg = /^(?:\+86)?(?:13[4-9]|14[5]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[8-9])\d{8}$/;
      this.checkflag5 = reg.test(this.phone);
    },
    // 校验
    checkbankcode() {
      let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
      this.checkflag6 = reg.test(this.bankcode);
    },
    // 提交注册
    submit() {
      console.log(this.$route.query.uuid, '2222');
      if (this.account === '') {
        this.$messageError('请输入帐号！');
        return;
      } else if (!this.checkflag1) {
        this.$messageError('请正确输入帐号！');
        return;
      } else if (this.niceName === '') {
        this.$messageError('请输入商户昵称！');
        return;
      } else if (!this.checkflag2) {
        this.$messageError('请正确输入商户昵称！');
        return;
      } else if (this.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (!this.checkflag3) {
        this.$messageError('请正确输入密码！');
        return;
      } else if (this.password !== this.surePassword) {
        this.$messageError('两次密码输入不一致！');
        return;
      } else if (this.mails === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (!this.checkflag4) {
        this.$messageError('请正确输入邮箱！');
        return;
      } else if (this.phone === '') {
        this.$messageError('请输入手机号码！');
        return;
      } else if (!this.checkflag5) {
        this.$messageError('请正确输入手机号码！');
        return;
      } else if (!this.checkflag6) {
        this.$messageError('请正确银行卡号！');
        return;
      } else if (!this.sureChecked) {
        this.$messageError('请勾选协议内容！');
        return;
      } else if (this.validcode === '') {
        this.$messageError('验证码不能为空！');
        return;
      }
      this.$api.login
        .register({
          loginName: this.account,
          nickname: this.niceName,
          password: this.password,
          confirmPassword: this.surePassword,
          qqNumber: this.qq,
          phoneNumber: this.phone,
          email: this.mails,
          uuid: this.$route.query.uuid ? this.$route.query.uuid : null,
          validateKey: this.validKey,
          validateCode: this.validcode
        })
        .then(data => {
          if (data.status === 200) {
            this.$messageSuccess('注册成功！');
            this.datainit();
            if (data.data === 'InAuth') {
              this.dialog.show = true;
            }
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 注册成功后的数据初始化
    datainit() {
      this.account = ''; // 登录帐号
      this.checkflag1 = true;
      this.niceName = ''; // 商户昵称
      this.checkflag2 = true;
      this.password = ''; // 账户密码
      this.checkflag3 = true;
      this.saferank = 0;
      this.surePassword = ''; // 确认密码
      this.qq = ''; // QQ
      this.mails = ''; // QQ
      this.checkflag4 = true;
      this.phone = ''; // 手机号码
      this.checkflag5 = true;
      this.sureChecked = false; // 是否同意协议
    },
    // 获取客服的联系QQ
    getinfo() {
      this.$api.login
        .contactinfo()
        .then(data => {
          if (data.status === 200) {
            this.serverQQ = JSON.parse(data.data.serviceQq).filter(item => {
              return item.type === 0;
            });
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    getRandomCode() {
      this.$api.login
        .getRandomCode()
        .then(data => {
          if (data.status === 200) {
            this.randomCode = data.data.imageData;
            this.validKey = data.data.validateKey;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.container {
    .line {
        border-bottom: #eee 1px solid;
    }

    .el-input__inner{
        border-radius: initial !important;
    }

    .content {
        // padding-top: 1px;
        // background: url(../../assets/images/login/rejester.jpg) no-repeat center top;
        width: 1000px;
        margin: 0 auto;
        margin-top: 15px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 6px;
        padding: 1px 30px;

        .topbox {
            margin-top: 10px;

            .tit {
                float: left;
                padding: 5px 0;
                border-bottom: 4px solid #3fd5e3;
                font-size: 25px;
                color: #373737;
            }

            .tip {
                float: right;
                margin-top: 14px;
                font-size: 15px;
                color: #373737;

                i {
                    color: #1288ab;
                    cursor: pointer;
                }
            }
        }

        .listBox {
            padding-left: 240px;
            margin-top: 14px;

            li {
                width: 485px;
                display: flex;
                flex-flow: row nowrap;
                margin-bottom: 14px;

                .tit {
                    width: 105px;
                    box-sizing: border-box;
                    padding-right: 10px;
                    height: 42px;
                    line-height: 42px;
                    font-size: 17px;
                    color: #5e5e5e;
                    border: 1px solid #aaaaaa;
                }

                .tentbox {
                    flex: 1;

                    .tip {
                        font-size: 14px;
                        color: #313131;
                        margin-top: 8px;

                        &.wrong {
                            color: red;
                        }

                        .progress {
                            color: #fff;

                            i {
                                padding: 0 5px;
                                background: #ccc;
                                border-right: 1px solid #fff;

                                &.on {
                                    background: red;
                                }
                            }
                        }
                    }
                    .el-input{
                        border: 1px solid #aaaaaa;
                    }
                }

                .submitBtn {
                    display: block;
                    width: 100%;
                    height: 50px;
                    background: #1073b1;
                    border-radius: 6px;
                    text-align: center;
                    color: #fff;
                    font-size: 17px;
                    line-height: 50px;
                    cursor: pointer;
                    margin-bottom: 40px;
                }
            }
        }
    }

    .dialogContainer {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99999;

        .dialogbox {
            .close {
                position: absolute;
                width: 22px;
                height: 22px;
                background: url(../../assets/images/login/cross_img.png) no-repeat center center;
                top: 12px;
                right: 12px;
                cursor: pointer;
            }

            position: absolute;
            width: 288px;
            min-height: 327px;
            background: #fff;
            top: 50%;
            left: 50%;
            margin-top: -163px;
            margin-left: -144px;
            border-radius: 20px;
            overflow: hidden;

            .tit {
                height: 66px;
                line-height: 66px;
                font-size: 24px;
                color: #fff;
                background: #1792e3;
                text-align: center;
                font-weight: normal;
            }

            .box {
                padding-top: 140px;
                background: url(../../assets/images/login/cross.png) no-repeat center 35px;
                text-align: center;

                .text {
                    color: #5f5f5f;
                    font-size: 18px;
                    margin-top: 5px;
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>
