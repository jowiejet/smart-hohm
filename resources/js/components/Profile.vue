<style>
.widget{
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    background-position: center center;
    background-size: cover;
    height: 300px;
    padding: 1rem;
}
</style>

<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget text-white" style="background: url('./img/user-cover2.jpg')">
                            <h3 class="widget-user-username text-right">{{ getProfileName() }}</h3>
                            <h5 class="widget-user-desc text-right">Web Designer</h5>
                        </div>
                        <div class="widget-user-image">
                            <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-sm-4 border-right">
                                    <div class="description-block">
                                        <h5 class="description-header">3,200</h5>
                                        <span class="description-text">SALES</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-sm-4 border-right">
                                    <div class="description-block">
                                        <h5 class="description-header">13,000</h5>
                                        <span class="description-text">FOLLOWERS</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                                <div class="col-sm-4">
                                    <div class="description-block">
                                        <h5 class="description-header">35</h5>
                                        <span class="description-text">PRODUCTS</span>
                                    </div>
                                    <!-- /.description-block -->
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->
                        </div>
                </div>
            </div>
            <div class="col-md-12">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
                    
                  </div>

                  <div class="tab-pane active" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email" :class="{ 'is-invalid': form.errors.has('email') }">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputBio" class="col-sm-2 control-label">Bio</label>

                        <div class="col-sm-10">
                          <textarea class="form-control" v-model="form.bio" id="inputBio" placeholder="Bio"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputPassword" class="col-sm-2 control-label">Password</label>

                        <div class="col-sm-10">
                          <input type="password" class="form-control" v-model="form.password" id="inputPassword" placeholder="Password">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputFile" class="col-sm-2 control-label">Profile Photo</label>
                        <div class="input-group">
                          <div class="col-sm-10 mx-3 custom-file">
                            <input type="file" @change="updateProfile" class="custom-file-input" id="exampleInputFile">
                            <div class="input-group-append">
                              <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" @click.prevent="updateInfo" class="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            form: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                access: '',
                bio: '',
                photo: ''
              })
          }

        },
        mounted() {
          console.log('Component mounted.')
        },
        methods:{
          getProfilePhoto(){
            let photo = this.form.photo;
            if(this.form.photo){
              let prefix = (this.form.photo.match(/\//) ? '' : '/img/profile/');
              return prefix + this.form.photo;
            }else {
              photo = 'img/profiles/' + this.form.photo;
            }
            return photo;
          },
          getProfileName(){
            return this.form.name
          },
          updateInfo(){
            this.$Progress.start();
            if(this.form.password == ''){
              this.form.password = undefined;
            }

            this.form.put('api/profile/')
            .then(() => {
              swal.fire({
                type: 'success',
                title: 'Updated',
                text: 'Your info has been updated!',
                animation: true,
                customClass: {
                  popup: 'animated tada'
                }
              })
              Fire.$emit('AfterCreate');
              this.$Progress.finish();
            }).catch(() => {
              this.$Progress.fail();
            });
          },
          updateProfile(e){
            let file = e.target.files[0];
            let reader = new FileReader();

            if(file['size'] < 2111775){
              reader.onloadend = (file) => {
                this.form.photo = reader.result;
              }
              reader.readAsDataURL(file);
            }else{
              swal.fire({
                type: 'error',
                title: 'Sorry...',
                text: 'You are uploading a large file',
                animation: true,
                customClass: {
                  popup: 'animated tada'
                }
              })
            }
          }
        },
        created(){
          axios.get("api/profile")
          .then(({ data }) => (this.form.fill(data)));
        },
        load() {
            this.load();
            Fire.$on('AfterCreate', () => {
                this.load();
            });
            //setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
