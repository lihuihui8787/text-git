<template>
  <table class="table is_bordered">
			<thead>
				<tr>
					<th></th>
					<!-- v-for 整数迭代是从1开始 -->
					<th>

					</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'getActiveSheet'
    ])
  },
  methods: {
    ...mapActions([
      'setActiveSheet'
    ])
  },
  mounted () {
    console.log(this.getActiveSheet)
    this.setActiveSheet(1)
    console.log(this.getActiveSheet)
  }
}
</script>
