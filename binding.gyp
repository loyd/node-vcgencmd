{
    "targets": [{
        "target_name": "binding",
        "sources": ["binding.cc"],
        "include_dirs": [
            "<!(node -e \"require('nan')\")",
            "/opt/vc/include",
            "/opt/vc/include/interface/vcos/pthreads",
            "/opt/vc/include/interface/vmcs_host/linux"
        ],

        "libraries": ["-lbcm_host", "-L/opt/vc/lib"]
    }]
}
