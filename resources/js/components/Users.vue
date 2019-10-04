<template>
<div class="container">
    <div class="row mt-5" v-if="$gate.isAdminOrParent()">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users Table</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-primary" @click="newModal">
                            <i class="fas fa-user-plus"></i>
                        </button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Access</th>
                                <th>Bio</th>
                                <th>Photo</th>
                                <th>Registered</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name | upText }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.access | upText }}</td>
                                <td>{{ user.bio }}</td>
                                <td>
                                    <img style="max-height: 40px;" alt="Avatar" class="img-fluid img-thumbnail" :src="getProfilePhoto(user.photo)">
                                </td>
                                <td>{{ user.created_at | myDate }}</td>
                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                    |
                                    <a href="#" @click="deleteUser(user.id)">
                                        <i class="fa fa-trash text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
                    <div class="card-footer pagination">
                        <div class="mx-auto">
                            <pagination :data="users" @pagination-change-page="getResults"></pagination>
                        </div>
                    </div>
            </div>
            <!-- /.card -->
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewCenterTitle" v-show="!editmode">Add new user</h5>
                    <h5 class="modal-title" id="addNewCenterTitle" v-show="editmode">Update user's info</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name"
                                placeholder="Name"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="text" name="email"
                                placeholder="Email Address"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" id="bio"
                                placeholder="Short bio for user (Optional)"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>
                        <div class="form-group">
                            <select v-model="form.access" name="access" id="access"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('access') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="parent">Parent</option>
                                <option value="children">Children</option>
                                <option value="guest">Guest</option>
                            </select>
                            <has-error :form="form" field="bio"></has-error>
                        </div> 
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" id="password"
                                placeholder="Password"
                                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>                  
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button v-show="editmode" type="submit" class="btn btn-info">Update</button>
                        <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-if="!$gate.isAdminOrParent()">
        <Not-Found></Not-Found>
    </div>
</div>
</template>

<script>
    export default {
        data(){
            return{
                editmode: false,
                users: {},
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
        methods:{
            getResults(page = 1) {
			    axios.get('api/user?page=' + page)
				    .then(response => {
					    this.users = response.data;
				    });
		    },
            getProfilePhoto(photo){
                this.form.photo = photo;
                return "img/profile/"+ photo;
            },
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                .then( () => {
                    $('#addNew').modal('hide');
                    swal.fire(
                        'Updated!',
                        'Information has been updated',
                        'success'
                    )
                    this.$Progress.finish();
                    Fire.$emit('NewUser');
                })
                .catch(() => {
                    this.$Progress.fail();
                });
            },
            editModal(user){
                this.editmode = true,
                this.form.reset();
                this.form.clear();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            newModal(){
                this.editmode = false,
                this.form.reset();
                this.form.clear();
                $('#addNew').modal('show');
            },
            deleteUser(id){
                    swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            this.form.delete('api/user/'+id).then(() => {
                                swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('NewUser');
                            }).catch(()=>{
                                swal.fire("Failed!", "Something went wrong!", "warning");
                            });
                        }
                })
            },
            loadUsers(){
                if(this.$gate.isAdminOrParent()){
                    axios.get("api/user").then(({ data }) => (this.users = data));
               }
            },
            createUser(){
                this.$Progress.start();
                this.form.post('api/user')
                .then(() => {
                    Fire.$emit('NewUser');
                    $('#addNew').modal('hide');
                    swal.fire({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            background: '#42b883',
                            timer: 3000,
                            type: 'success',
                            title: '<b style="color: #fff;">New user has been created successfully</b>'
                        }),
                    this.$Progress.finish();
                })
                .catch(() => {
                    
                })
                
            }
        },
        created() {
            Fire.$on('searching', () => {
                let query = this.$parent.search;
                axios.get('api/findUser?q=' + query)
                .then((data) => {
                    this.users = data.data;
                }).catch(() => {

                })
            })
            this.loadUsers();
            Fire.$on('NewUser', () => {
                this.loadUsers();
            });
            setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
