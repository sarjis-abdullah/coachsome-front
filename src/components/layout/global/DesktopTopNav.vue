<template>
	<v-row class="d-none d-md-block desktop-tite-box" :class="extraClass">
		<v-col cols="12" class="desktop-header">
			<span v-text="headerText"></span>
		</v-col>
		<v-col cols="12" class="px-0 py-0">
			<div class="line"></div>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        props: 
		{
			headerText: {
				type: String,
				default: ""
			},
			extraClass: {
				type: String,
				default: ""
			},
			actionClass:{
				type: String,
				default: ""
			}
		}
    }
</script>

<style scoped lang="scss">

.desktop-tite-box{
	padding-bottom: 30px!important;
}

.desktop-header{
	padding: 0 0 20px 25px!important;
	font-family: $font-family;
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 30px;
	color: $grey-700;

}

</style>