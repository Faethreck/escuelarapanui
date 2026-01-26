# Resource Analysis - Escuela Rapa Nui Website

## Website Characteristics

This is a **lightweight Next.js website** with:
- ✅ No database connections
- ✅ No heavy API calls
- ✅ Mostly static content with SSR
- ✅ Simple dependencies (React, Next.js, Tailwind CSS)
- ✅ External images (loaded from escuelarapanui.cl, not hosted locally)
- ✅ Minimal server-side processing

## Resource Usage Per Website

### Typical Resource Consumption (Per Instance)

**At Rest (Idle):**
- **RAM:** 80-150 MB per Next.js instance
- **CPU:** < 1% (minimal)
- **Disk:** ~200-300 MB (node_modules + build files)

**Under Load (100 concurrent users):**
- **RAM:** 150-250 MB per instance
- **CPU:** 5-15% per core
- **Network:** Minimal (mostly static assets)

**Peak Load (500+ concurrent users):**
- **RAM:** 250-400 MB per instance
- **CPU:** 20-40% per core
- **Network:** Moderate

## Server Capacity Analysis

### Your Server Specs
- **vCPU:** 4 cores
- **RAM:** 8 GB
- **Storage:** (varies, but typically 80-160 GB on Hetzner)

### Capacity Estimates

#### Conservative Estimate (Safe Production)
- **~15-20 similar websites** comfortably
- Each running on different ports (3000, 3001, 3002, etc.)
- With room for system processes, Nginx, PM2, etc.

#### Realistic Estimate (Good Performance)
- **~25-30 similar websites**
- Assuming moderate traffic (100-500 visitors/day per site)
- With proper PM2 memory limits

#### Maximum Estimate (High Density)
- **~40-50 similar websites**
- With aggressive memory limits (200MB per instance)
- Lower traffic sites only
- Requires careful monitoring

### Resource Breakdown

**System Overhead:**
- OS + System processes: ~500 MB - 1 GB
- Nginx: ~50-100 MB
- PM2: ~50-100 MB
- **Total System:** ~1-1.5 GB

**Available for Websites:**
- **~6.5-7 GB RAM available**
- **~3.5-4 CPU cores effectively available**

**Per Website (Average):**
- RAM: 150 MB average
- CPU: 2-5% average (spikes during requests)

## Recommended Configuration

### PM2 Memory Limits

Set memory limits to prevent any single site from consuming too much:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'website-1',
      max_memory_restart: '300M', // Restart if exceeds 300MB
      // ... other config
    }
  ]
}
```

### Nginx Configuration

Use Nginx as reverse proxy (very efficient):
- Handles SSL termination
- Serves static files efficiently
- Minimal resource usage (~50-100 MB total)

### Monitoring Setup

```bash
# Install PM2 monitoring
pm2 install pm2-server-monit

# View resource usage
pm2 monit

# Check memory usage
pm2 list
```

## Optimization Tips

### 1. Enable Next.js Static Export (if possible)
If your site doesn't need SSR, export as static:

```javascript
// next.config.js
module.exports = {
  output: 'export', // Static export
  // ... other config
}
```

This reduces RAM usage to ~50-100 MB per site.

### 2. Use PM2 Cluster Mode (for high-traffic sites)
```javascript
{
  instances: 2, // Use 2 instances for load balancing
  exec_mode: 'cluster'
}
```

### 3. Implement Caching
- Use Nginx caching for static assets
- Enable Next.js ISR (Incremental Static Regeneration)

### 4. Monitor and Restart
```bash
# Auto-restart if memory exceeds limit
pm2 start app.js --max-memory-restart 300M
```

## Real-World Scenarios

### Scenario 1: 10 Small School Websites
- **Traffic:** 50-200 visitors/day each
- **RAM Usage:** ~1.5 GB total
- **CPU Usage:** 10-20% average
- **Verdict:** ✅ Very comfortable, lots of headroom

### Scenario 2: 20 Medium Websites
- **Traffic:** 100-500 visitors/day each
- **RAM Usage:** ~3-4 GB total
- **CPU Usage:** 30-50% average
- **Verdict:** ✅ Comfortable, good performance

### Scenario 3: 30 Websites
- **Traffic:** 50-300 visitors/day each
- **RAM Usage:** ~4.5-5.5 GB total
- **CPU Usage:** 40-60% average
- **Verdict:** ⚠️ Manageable, but monitor closely

### Scenario 4: 40+ Websites
- **Traffic:** 20-100 visitors/day each
- **RAM Usage:** ~6-7 GB total
- **CPU Usage:** 50-70% average
- **Verdict:** ⚠️ Possible but requires careful management

## Comparison with Other Website Types

| Website Type | RAM per Instance | Can Host on 8GB |
|--------------|------------------|-----------------|
| **This Next.js site** | 150 MB | **~40-50 sites** |
| WordPress | 200-400 MB | ~15-20 sites |
| Laravel/PHP | 100-200 MB | ~30-40 sites |
| Node.js API | 200-500 MB | ~10-20 sites |
| Static HTML | 0 MB (Nginx only) | 100+ sites |

## Recommendations

### For Your Use Case (4 vCPU, 8GB RAM)

**Optimal Setup:**
- **15-25 websites** for best performance
- Each with PM2 memory limit of 300MB
- Use Nginx for reverse proxy
- Monitor with PM2 monit

**Maximum Setup:**
- **30-40 websites** if traffic is low
- Requires aggressive memory limits (200MB)
- Close monitoring required
- May need to upgrade if traffic grows

### Scaling Strategy

1. **Start with 10-15 websites**
2. **Monitor resource usage** for 1-2 weeks
3. **Gradually add more** if resources allow
4. **Set up alerts** for high CPU/RAM usage
5. **Upgrade when** consistently above 70% usage

## Monitoring Commands

```bash
# Check overall system resources
htop
# or
free -h
top

# Check PM2 processes
pm2 list
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# Check disk usage
df -h

# Check network connections
netstat -tulpn | grep LISTEN
```

## Conclusion

**Your server can comfortably host 20-30 similar Next.js websites** with good performance. This is a lightweight application that doesn't require heavy resources. With proper configuration and monitoring, you could potentially host 40+ sites if traffic is moderate.

The key is:
- ✅ Use PM2 with memory limits
- ✅ Monitor resource usage regularly
- ✅ Use Nginx efficiently
- ✅ Optimize Next.js builds
- ✅ Scale gradually
