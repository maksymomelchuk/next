(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[499],{6058:function(e,t,r){Promise.resolve().then(r.bind(r,3078))},3078:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return w}});var l=r(5607),n=r(8570),a=r(5125),i=r(6028);let o=i.z.object({id:i.z.number(),file_version:i.z.number(),size:i.z.number(),modified:i.z.number(),status_id:i.z.number(),total_records:i.z.number(),total_valid_records:i.z.number(),total_error_records:i.z.number(),parsed_at:i.z.number(),sdp_id:i.z.number(),nena_version:i.z.string(),file:i.z.string(),size_human:i.z.string(),modified_human:i.z.string(),header:i.z.array(i.z.any()),trailer:i.z.array(i.z.any()),error:i.z.array(i.z.any()),created_at:i.z.union([i.z.string(),i.z.null()]),updated_at:i.z.union([i.z.string(),i.z.null()])}),s=i.z.array(o),c=async(e,t,r)=>{let{data:l}=await a.ZP.get("/soi/imports".concat(r,"&limit=").concat(e,"&offset=").concat(t)),n=s.parse(l);return n},u=async e=>{let{id:t,data:r}=e,l=await a.ZP.put("/soi/imports/".concat(t),r);return console.log("Data after updating soi imports",l),l};var d=r(3202),m=r(4889),g=r(4811),b=r(8025),h=r(5344),z=r(4279),p=r(813),_=r(4989),y=r(6790),f=r(961),S=r(9680),x=r(5052);let j=[{id:"select",header:e=>{let{table:t}=e;return(0,l.jsx)(_.X,{checked:t.getIsAllPageRowsSelected(),onCheckedChange:e=>t.toggleAllPageRowsSelected(!!e),"aria-label":"Select all",className:"translate-y-[2px]"})},cell:e=>{let{row:t}=e;return(0,l.jsx)(_.X,{checked:t.getIsSelected(),onCheckedChange:e=>t.toggleSelected(!!e),"aria-label":"Select row",className:"translate-y-[2px]"})},meta:{width:10},enableSorting:!1,enableHiding:!1},{id:"expand",cell:e=>{let{row:t}=e;return t.getAllCells().length>t.getVisibleCells().length&&(0,l.jsx)(S.Z,{row:t})},size:40,enableSorting:!1,enableHiding:!1},{accessorKey:"id",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Id"})},cell:f.n,enableHiding:!1,enableColumnFilter:!1,meta:{width:20}},{accessorKey:"file",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"File"})},cell:f.n},{accessorKey:"file_version",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"File version"})},cell:f.n,enableSorting:!1},{accessorKey:"modified_human",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Modified human"})},cell:f.n,enableSorting:!1},{accessorKey:"nena_version",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"NENA version"})},cell:f.n,enableSorting:!1},{accessorKey:"size",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Size"})},cell:f.n,enableSorting:!1},{accessorKey:"size_human",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Size human"})},cell:f.n,enableSorting:!1},{accessorKey:"status_id",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Status Id"})},cell:f.n,enableSorting:!1},{accessorKey:"total_records",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Total records"})},cell:f.n,enableSorting:!1},{accessorKey:"total_valid_records",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Total valid records"})},cell:f.n,enableSorting:!1},{accessorKey:"total_error_records",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Total error records"})},cell:f.n,enableSorting:!1},{accessorKey:"modified",header:e=>{let{column:t}=e;return(0,l.jsx)(y.p,{column:t,title:"Modified"})},cell:f.n,meta:{type:"select",options:[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]},enableColumnFilter:!1,enableSorting:!1},{id:"actions",cell:e=>{let{row:t,table:r}=e;return(0,l.jsx)(x.F,{row:t,table:r})},meta:{width:20}}],v=i.z.object({size_human:i.z.string().min(2).max(127)});var w=()=>{let e=(0,m.b)("Soi@ListRecordsHistory"),[t,r]=(0,n.useState)(!1),a=(0,p.G)("/soi/imports"),{data:i,isFetching:o,fetchNextPage:s,isLoading:_}=(0,g.i)(["/soi/imports",a],c,e,a),{mutateAsync:y}=(0,z.F)(u,["/soi/imports"]),f=n.useRef(null),{flatData:S,fetchMoreOnBottomReached:x}=(0,b._)({data:i,isFetching:o,fetchNextPage:s,tableContainerRef:f}),w=(0,h.x)(S,j,y,v);return(0,l.jsx)(d.d,{table:w,data:S,isLoading:_,setOpenDialogue:r,openDialogue:t,fetchMoreOnBottomReached:x,tableContainerRef:f})}}},function(e){e.O(0,[468,28,246,211,367,41,869,501,524,744],function(){return e(e.s=6058)}),_N_E=e.O()}]);