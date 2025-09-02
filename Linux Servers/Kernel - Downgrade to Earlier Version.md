Azure always deploys the latest version of the kernel when you provision a marketplace VM. You can downgrade with a set of manual steps:

1. Deploy a new VM using latest kernel
2. Snapshot / backup the VM
3. Verify the kernel: `grep -Ei 'submenu|menuentry ' /boot/grub/grub.cfg | sed -re "s/(.? )'([^']+)'.*/\1 \2/"`
4. Install the supported kernel: `sudo apt-get install linux-image-6.8.0-1027-azure`
5. Verify that the kernel is now present: `grep -Ei 'submenu|menuentry ' /boot/grub/grub.cfg | sed -re "s/(.? )'([^']+)'.*/\1 \2/ `
6. Change the default grub from `GRUB_DEFAULT=1` to `GRUB_DEFAULT="1>2"`
7. Rebuild the grub.cfg file with `update-grub`
8. Reboot the OS `reboot`
9. Verify the changes: `uname -r`
