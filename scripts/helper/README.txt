Famstack systemd bundle
=======================

This bundle replaces the nohup + shell loop watchdog approach with systemd services.

What you get
------------
- Automatic restart on crash: Restart=always
- Automatic start on reboot: systemctl enable
- Cleaner stop/start/status operations
- Better process supervision
- Fewer orphan processes
- Logs available through both your existing /tmp log files and journalctl

Expected target layout on server
--------------------------------
Copy this bundle to:
  /home/famstack-app/common/source/

After copy, these paths should exist:
  /home/famstack-app/common/source/bin
  /home/famstack-app/common/source/env
  /home/famstack-app/common/source/systemd

Install
-------
1. Copy files to server under:
     /home/famstack-app/common/source/

2. Run:
     chmod +x /home/famstack-app/common/source/bin/*.sh
     sudo /home/famstack-app/common/source/bin/install_systemd_services.sh

3. Start services:
     /home/famstack-app/common/source/bin/start_all_services.sh

Useful commands
---------------
Start one service:
  sudo systemctl start fsapp-9081

Stop one service:
  sudo systemctl stop fsapp-9081

Restart one service:
  sudo systemctl restart fsapp-9081

Enable on boot:
  sudo systemctl enable fsapp-9081

Disable on boot:
  sudo systemctl disable fsapp-9081

Check status:
  sudo systemctl status fsapp-9081

Check logs from journal:
  sudo journalctl -u fsapp-9081 -f

Check app file logs:
  tail -f /tmp/f9081_3.0.13_2_1.log
  tail -f /tmp/f8081_3.0.13_2.log
  tail -f /tmp/f7081_3.0.13_2.log
  tail -f /tmp/f6080_3.0.9.log

Notes
-----
- These unit files use User=ubuntu. Change that if your Java apps run as another user.
- WorkingDirectory is set per app path.
- Existing app log files remain the same by using StandardOutput=append and StandardError=append.
- Port checks are not included in this bundle.
- The 9081 service keeps the heap dump and GC log flags you originally used.
