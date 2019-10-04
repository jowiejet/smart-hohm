<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-12">
                <!-- interactive chart -->
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-bar"></i>
                            Power Monitoring
                        </h3>
                    </div>
                    <div class="card-body">
                        <div id="interactive" style="height: 300px;"></div>
                    </div>
                    <!-- /.card-body-->
                </div>
                <!-- /.card -->
            </div>
          <!-- /.col -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form: new Form({
                    
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
