using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApp.Models;

namespace TestApp.Controllers
{
    public class AuthController : Controller
    {
        #region USER

        [HttpGet]
        public async Task<JsonResult> GetUser()
        {
            using(var db = new DemodbContext())
            {
                var data = await db.User.ToListAsync();
                return Json(data);
            }
        }

        [HttpPost]
        public async Task<JsonResult> AddUser([FromBody] User user)
        {
            using(var db = new DemodbContext())
            {
                var data = await db.User.FindAsync(user.Id);
                if (data != null)
                {
                    var ex = await db.User.FirstOrDefaultAsync(o => o.UserName == user.UserName);
                    if (ex != null)
                    {
                        return Json(new { msg = 4 });
                    }
                    else
                    {
                        data = new User
                        {
                            UserName = user.UserName,
                            Password = user.Password,
                            Mobile = user.Mobile,
                            Email = user.Email
                        };
                        await db.SaveChangesAsync();
                        return Json(new { msg = 3 });
                    }
                    
                }
                else
                {
                    var exist = await db.User.FirstOrDefaultAsync(o => o.UserName == user.UserName);
                    if(exist != null){
                        return Json(new { msg = 2 });
                    }
                    else
                    {
                        await db.User.AddAsync(user);
                        await db.SaveChangesAsync();
                        return Json(new { msg = 1 });
                    }
                   
                }

            }
        }

        [HttpPost]
        public async Task<JsonResult> DeleteUser([FromBody] User user)
        {
            using(var db = new DemodbContext())
            {
                var data = await db.User.FindAsync(user.Id);
                db.User.Remove(data);
                await db.SaveChangesAsync();
                return Json(new { msg = 1 });
            }
        }

        #endregion

        #region ROLE

        [HttpGet]
        public async Task<JsonResult> GetRoles()
        {
            using(var db = new DemodbContext())
            {
                var data = await db.Role.ToListAsync();
                return Json(data);
            }
        }

        [HttpPost]
        public async Task<JsonResult> AddRole([FromBody] Role role)
        {
            using (var db = new DemodbContext())
            {
                var data = await db.Role.FindAsync(role.Id);
                if (data != null)
                {
                    var ex = await db.Role.FirstOrDefaultAsync(o => o.RoleName == role.RoleName);
                    if (ex != null)
                    {
                        return Json(new { msg = 4 });
                    }
                    else
                    {
                        data = new Role
                        {
                            RoleName = role.RoleName
                        };
                        await db.SaveChangesAsync();
                        return Json(new { msg = 3 });
                    }

                }
                else
                {
                    var exist = await db.Role.FirstOrDefaultAsync(o => o.RoleName == role.RoleName);
                    if (exist != null)
                    {
                        return Json(new { msg = 2 });
                    }
                    else
                    {
                        await db.Role.AddAsync(role);
                        await db.SaveChangesAsync();
                        return Json(new { msg = 1 });
                    }

                }

            }
        }

        [HttpPost]
        public async Task<JsonResult> DeleteRole([FromBody] Role role)
        {
            using (var db = new DemodbContext())
            {
                var data = await db.Role.FindAsync(role.Id);
                db.Role.Remove(data);
                await db.SaveChangesAsync();
                return Json(new { msg = 1 });
            }
        }



        #endregion

        #region LOGIN

        [HttpPost]
        public async Task<JsonResult> Login([FromBody] LoginModel model)
        {
            using(var db = new DemodbContext())
            {
                var data = await db.User.FirstOrDefaultAsync(o => o.UserName == model.UserName && o.Password == model.Password);

                return Json(new { msg = (data != null) ? 1 : 2 });
            }
        }

        #endregion

    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

}