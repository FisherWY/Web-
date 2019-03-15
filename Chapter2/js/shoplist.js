$().ready(function () {
	$('#shoplistTable').bootstrapTable({
		url: null,
		// width: 90%,
		striped: true,
		pagination: true, // 分页
		pageNumber: 1,
		pageSize: 3
	})
});