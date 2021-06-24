<template>
  <div class="box">
    <!--基础信息-->
    <base-info v-if="type==1"></base-info>
    <!--用药协助-->
    <medical-info v-if="type==2"></medical-info>
    <!--照护需求-->
    <care-info v-if="type==3"></care-info>
    <!--评估资料-->
    <evalue-info v-if="type==4"></evalue-info>
    <!--专业医护-->
    <ealth-info v-if="type==5"></ealth-info>
  </div>
</template>

<script>
import BaseInfo from './components/BasicInfo';
import CareInfo from './components/CareInfo';
import EalthInfo from './components/EalthInfo';
import EvalueInfo from './components/EvaluationInfo';
import MedicalInfo from './components/MedicineInfo';

export default {
  name: 'Index',
  data () {
    return {
      type: 0
    };
  },
  components: {
    BaseInfo,
    CareInfo,
    EalthInfo,
    EvalueInfo,
    MedicalInfo

  },
  methods: {

  },
  created () {
    this.type = this.$route.query.type;
  }
};

</script>

<style lang="scss" scoped>

</style>
