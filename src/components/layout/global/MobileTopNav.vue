<template>
	<v-row class="page-top-header-row d-md-none" justify="center" :class="extraClass">
		<v-col
		cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12" class="justify-center page-top-header-column pa-0 ma-0">
				<v-list width="100%" color="transparent" class="py-0 my-0">
						<v-list-item>
							<slot name="goBack"></slot>
							<v-list-item-content class="py-0 my-0">
								<v-list-item-title class="common-top-page-title"
									v-text="headerText"
								></v-list-item-title>
							</v-list-item-content>
							<v-list-item-action :class="actionClass">
								<slot name="action"></slot>
							</v-list-item-action>
						</v-list-item>
				</v-list>
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

.page-top-header-row{
	z-index: 999!important;
}

</style>