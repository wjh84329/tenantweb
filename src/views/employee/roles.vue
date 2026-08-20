<template>
    <div class="home">
        <div class="gs_title" style="color: white;">角色管理</div>
        <div class="btnsbox mgt10" style="margin-left: 2%;">
            <el-button size="small" type="primary" @click="openAddDialog">添加角色</el-button>
        </div>
        <div class="tablebox pdb15 pdt20">
            <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
                    <el-table-column prop="id" label="ID" width="120"></el-table-column>
                    <el-table-column prop="name" label="角色组" width="180"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" size="mini" @click="openEditDialog(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="mgt15 pdl20">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="1" :page-size="10"
                    :current-page="1" :page-sizes="[10]">
                </el-pagination>
            </div>
        </div>

        <!-- 添加/编辑角色弹窗 -->
        <el-dialog :title="isEdit ? '编辑角色' : '添加角色'" :visible.sync="dialogVisible" width="700px" @close="resetForm">
            <el-form :model="form" label-width="100px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单路由">
                    <div style="margin-bottom: 10px;">
                        <el-checkbox v-model="expandAll" @change="handleExpandAll">展开/收起</el-checkbox>
                        <el-checkbox v-model="checkAll" @change="handleCheckAll">全选/全不选</el-checkbox>
                    </div>
                    <el-tree ref="menuTree" :data="menuData" show-checkbox node-key="id" :default-expand-all="expandAll"
                        :default-checked-keys="checkedKeys" style="border: none;"></el-tree>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSave">{{ isEdit ? '保存' : '添加' }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'Roles',
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      isEdit: false,
      editIndex: null,
      form: {
        roleName: '',
        remark: ''
      },
      menuData: [
        {
          id: 1,
          label: '首页',
          children: [
            { id: 11, label: '分区模版' },
            { id: 12, label: '安装分区' },
            { id: 13, label: '分区管理' },
            { id: 14, label: '分组管理' },
            { id: 15, label: '手动补发' },
            { id: 16, label: '补发记录' },
            { id: 17, label: '通讯秘钥' },
            { id: 18, label: '获取代码' },
            { id: 19, label: '下载网关' },
            { id: 20, label: '整区补发' },
            { id: 101, label: '删除模板' },
            { id: 102, label: '删除分区' }
          ]
        },
        {
          id: 2,
          label: '订单管理',
          children: [

          ]
        },
        {
          id: 3,
          label: '分区管理',
          children: [

          ]
        },
        {
          id: 4,
          label: '数据分析',
          children: [

          ]
        },
        {
          id: 5,
          label: '在线客服',
          children: [

          ]
        },
        {
          id: 6,
          label: '通道排序',
          children: [

          ]
        },
        {
          id: 7,
          label: '皮肤设置',
          children: [

          ]
        },
        {
          id: 8,
          label: '充值角色名设置',
          children: [

          ]
        },
        {
          id: 9,
          label: '玩家留言',
          children: [

          ]
        },
        {
          id: 10,
          label: '充值金额',
          children: [

          ]
        },
        {
          id: 11,
          label: '手机号码',
          children: [

          ]
        }
      ],
      checkedKeys: [],
      expandAll: false,
      checkAll: false
    };
  },
  methods: {
    openAddDialog() {
      this.isEdit = false;
      this.dialogVisible = true;
      this.resetForm();
    },
    openEditDialog(index, row) {
      this.isEdit = true;
      this.editIndex = index;
      this.dialogVisible = true;
      this.form.roleName = row.name;
      this.form.remark = row.description;
      // 菜单权限赋值
      if (row.menus) {
        let checkedKeys = row.menus.split(',').map(id => Number(id));
        // 只有所有子菜单都选中时才选中父级
        this.menuData.forEach(parent => {
          if (parent.children && parent.children.length > 0) {
            const childIds = parent.children.map(child => child.id);
            const allChildrenChecked = childIds.every(id => checkedKeys.includes(id));
            if (allChildrenChecked) {
              if (!checkedKeys.includes(parent.id)) {
                checkedKeys.push(parent.id);
              }
            } else {
              // 如果父级本身被选中但并非所有子菜单都选中，则去掉父级选中
              checkedKeys = checkedKeys.filter(id => id !== parent.id);
            }
          }
        });
        this.checkedKeys = checkedKeys;
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys(this.checkedKeys);
        });
      } else {
        this.checkedKeys = [];
        this.$nextTick(() => {
          this.$refs.menuTree.setCheckedKeys([]);
        });
      }
      this.expandAll = false;
      this.checkAll = false;
    },
    handleExpandAll(val) {
      const tree = this.$refs.menuTree;
      if (tree) {
        this.menuData.forEach(node => {
          if (tree.store.nodesMap[node.id]) {
            tree.store.nodesMap[node.id].expanded = val;
          }
          if (node.children) {
            node.children.forEach(child => {
              if (tree.store.nodesMap[child.id]) {
                tree.store.nodesMap[child.id].expanded = val;
              }
            });
          }
        });
        tree.$forceUpdate();
      }
    },
    handleCheckAll(val) {
      const allIds = [];
      this.menuData.forEach(node => {
        allIds.push(node.id);
        if (node.children) {
          node.children.forEach(child => allIds.push(child.id));
        }
      });
      if (val) {
        this.checkedKeys = allIds;
      } else {
        this.checkedKeys = [];
      }
      this.$refs.menuTree.setCheckedKeys(this.checkedKeys);
    },
    handleSave() {
      const checkedMenus = this.$refs.menuTree.getCheckedKeys();
      // 保证所有有选中子菜单的父菜单也被选中
      this.menuData.forEach(parent => {
        if (
          parent.children &&
                    parent.children.some(child => checkedMenus.includes(child.id))
        ) {
          if (!checkedMenus.includes(parent.id)) {
            checkedMenus.push(parent.id);
          }
        }
      });
      const menus = checkedMenus.join(',');
      this.$api.employee
        .addRole({
          id: this.isEdit ? this.tableData[this.editIndex].id : 0,
          name: this.form.roleName,
          description: this.form.remark,
          menus: menus // 保存菜单权限
        })
        .then((data) => {
          this.getRoleList();
          this.$message({
            type: 'success',
            message: this.isEdit ? '角色更新成功!' : '角色添加成功!'
          });
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
      this.dialogVisible = false;
      this.resetForm();
    },
    handleDelete(index) {
      this.$confirm('确定要删除该角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.employee
          .delRole({ id: this.tableData[index].id })
          .then((data) => {
            this.getRoleList();
            this.$message({
              type: 'success',
              message: '角色删除成功!'
            });
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }).catch(() => {});
    },
    // 获取角色列表
    // ...existing code...
    getRoleList() {
      this.$api.employee
        .getRole()
        .then((data) => {
          // 保证 tableData 是数组
          this.tableData = data.data.data;
          console.log(this.tableData);
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // ...existing code...
    resetForm() {
      this.form.roleName = '';
      this.form.remark = '';
      this.checkedKeys = [];
      this.expandAll = false;
      this.checkAll = false;
      this.editIndex = null;
    }
  },
  created() {
    this.getRoleList();
  }
};
</script>

<style scoped>

.gs_title {
  background: var(--theme-color);
}
.dialog-footer {
    text-align: right;
}
::v-deep .el-dialog__body {
    max-height: 60vh;
    overflow-y: auto;
}
</style>
