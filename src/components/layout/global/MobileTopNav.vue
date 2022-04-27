<template>
	<v-row class="page-top-header-row d-md-none" :class="extraClass">
		<v-col cols="12" class="justify-center page-top-header-column pa-0 ma-0">
				<v-list width="100%" color="transparent" class="pa-0 ma-0">
						<v-list-item>
							<slot name="goBack"></slot>
							<v-list-item-content class="pa-0 ma-0">
								<v-list-item-title class="common-top-page-title"
									v-text="headerText"
								></v-list-item-title>
							</v-list-item-content>
							<v-list-item-action style="padding-right: 10px" :class="actionClass">
								<slot name="action"></slot>
							</v-list-item-action>
						</v-list-item>
				</v-list>
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

.v-list-item{
	&__action{
		margin: 0!important;
	}
}
.v-list-item{
	padding: 0!important;
}
</style>