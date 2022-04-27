<template>
	<v-row class="page-top-header-row  body-bg">
		<v-col cols="12" class="justify-center page-top-header-column px-0 mx-0">
				<v-list width="100%" color="transparent" class="py-0 my-0">
						<v-list-item class="pl-0 ml-0">
							<v-btn
								icon
								@click="$router.go(-1)"
							>
								<v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
							</v-btn>
							<v-list-item-content class="pl-1 py-0 my-0">
								<v-list-item-title class="common-top-page-title"
									v-text="headerText"
								></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
				</v-list>
				<div class="line"></div>
		</v-col>
	</v-row>
</template>

<script>
    export default {
        props: {
					headerText: {
						type: String,
						default: ""
					},
				},
    }
</script>

<style scoped>

</style>