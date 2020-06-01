<template>
    <div class="grid-view" ref="gridView">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"GridView",
    props:{
        cols:{
            type:Number,
            default:2
        },
        hMargin:{
            type:Number,
            default:8
        },
        vMargin:{
            type:Number,
            default:8
        },
        itemSpace:{
            type:Number,
            default:8
        },
        lineSpace:{
            type:Number,
            default:8 
        }
    },
    mounted: function(){
        setTimeout(this._autoLayout,20)
    },
    // 挂载之后，vue的数据改变会引起页面视图的改变，此时触发的是updated事件，
    // 而不是mounted(mounted只会在挂载实例的时候调用一次)
    updated: function(){
        this._autoLayout()
    },
    methods:{
        _autoLayout:function(){
            // 获取gridE1和children
            // 不使用document.querySelector的原因是如果项目中多处都用到grid-view的话，
            // 那么这里就不知道确定获取哪一个了
            let gridEl=this.$refs.gridView;
            let children=gridEl.children;
            // 设置gridEl的内边距
            gridEl.style.padding=`${this.vMargin}px ${this.hMargin}px`
            // clientWidth的实际宽度=>clientWidth = width+左右padding
            // itemWidth是每一个项目的宽度
            let itemWidth = (gridEl.clientWidth - 2 * this.hMargin - (this.cols - 1) * this.itemSpace) / this.cols;
            for (let i = 0; i < children.length; i++) {
            let item = children[i];
            item.style.width=itemWidth+ 'px';
                if((i+1)%this.cols!==0){
                    item.style.marginRight = this.itemSpace + 'px'
                }
                if(i>=this.cols){
                    item.style.marginTop=this.lineSpace+ 'px'
                }
            }
        }
    }
}
</script>
<style scoped>
  .grid-view {
    display: flex;
    flex-wrap: wrap;
    /* 规定灵活的项目在必要的时候拆行或拆列。 */
  }
</style>